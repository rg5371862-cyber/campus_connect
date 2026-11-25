"""Public event-registration API.

Authentication is deliberately not enabled yet. Until it is, endpoints that
would normally infer the current user accept an explicit ``user_id`` instead.
"""

import os
from pathlib import Path
from uuid import UUID

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from httpx import HTTPError
from postgrest import APIError
from supabase import Client, create_client


env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

frontend_dist = Path(__file__).resolve().parent.parent / "frontend" / "dist"
app = Flask(
    __name__,
    # Vite places fingerprinted JavaScript and CSS below dist/assets. Keeping
    # that URL stable lets Flask serve the whole application from one origin.
    static_folder=str(frontend_dist / "assets"),
    static_url_path="/assets",
)

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
if not supabase_url or not supabase_key:
    raise ValueError(
        "Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY environment variables. "
        "Set them in your environment or in backend/.env"
    )

supabase: Client = create_client(supabase_url, supabase_key)


@app.after_request
def add_cors_headers(response):
    """Allow a separately-hosted frontend while authentication is disabled."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.route("/api/<path:_path>", methods=["OPTIONS"])
def options(_path):
    return "", 204


def error(message, status_code, *, details=None):
    body = {"error": message}
    if details:
        body["details"] = details
    return jsonify(body), status_code


def validate_uuid(value, field_name):
    if not value or not isinstance(value, str):
        return None, error(f"{field_name} is required and must be a UUID.", 400)
    try:
        UUID(value)
    except ValueError:
        return None, error(f"{field_name} must be a valid UUID.", 400)
    return value, None


def database_error(exc):
    # Do not leak provider details or credentials to API consumers.
    app.logger.exception("Supabase request failed", exc_info=exc)
    return error("Database request failed.", 502)


def get_event(event_id):
    response = supabase.table("events").select("*").eq("id", event_id).limit(1).execute()
    return response.data[0] if response.data else None


@app.get("/")
def index():
    """Serve the compiled event portal at the same address as the API."""
    return send_from_directory(frontend_dist, "index.html")


@app.get("/api/users")
def list_users():
    """List all registered users."""
    try:
        response = supabase.table("users").select("id,email,role").execute()
        return jsonify({"data": response.data or []})
    except (APIError, HTTPError) as exc:
        return database_error(exc)


@app.get("/api/events")
def list_events():
    """Browse events, optionally filtered by their status."""
    try:
        query = supabase.table("events").select("id,organizer_id,title,capacity,status")
        if status := request.args.get("status"):
            query = query.eq("status", status)
        response = query.order("title").execute()
        return jsonify({"data": response.data or []})
    except (APIError, HTTPError) as exc:
        return database_error(exc)


@app.get("/api/events/<event_id>")
def event_details(event_id):
    _, validation_error = validate_uuid(event_id, "event_id")
    if validation_error:
        return validation_error
    try:
        event = get_event(event_id)
        if not event:
            return error("Event not found.", 404)
        return jsonify({"data": event})
    except (APIError, HTTPError) as exc:
        return database_error(exc)


@app.post("/api/registrations")
def create_registration():
    """Register a supplied user for an event; duplicate/full registrations are 409."""
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return error("A JSON request body is required.", 400)

    user_id, validation_error = validate_uuid(payload.get("user_id"), "user_id")
    if validation_error:
        return validation_error
    event_id, validation_error = validate_uuid(payload.get("event_id"), "event_id")
    if validation_error:
        return validation_error

    try:
        event = get_event(event_id)
        if not event:
            return error("Event not found.", 404)

        existing = (
            supabase.table("registrations")
            .select("id")
            .eq("user_id", user_id)
            .eq("event_id", event_id)
            .limit(1)
            .execute()
        )
        if existing.data:
            return error("User is already registered for this event.", 409)

        registrations = (
            supabase.table("registrations").select("id", count="exact").eq("event_id", event_id).execute()
        )
        if event.get("capacity") is not None and (registrations.count or 0) >= event["capacity"]:
            return error("Event capacity has been reached.", 409)

        response = (
            supabase.table("registrations")
            .insert({"user_id": user_id, "event_id": event_id})
            .select("id,user_id,event_id,created_at")
            .execute()
        )
        return jsonify({"data": response.data[0]}), 201
    except (APIError, HTTPError) as exc:
        # A database unique constraint is the final safeguard for duplicate
        # submissions arriving concurrently.
        if getattr(exc, "code", None) == "23505":
            return error("User is already registered for this event.", 409)
        return database_error(exc)


@app.get("/api/me/registrations")
def my_registrations():
    """List a user's registrations. user_id replaces auth context for now."""
    user_id, validation_error = validate_uuid(request.args.get("user_id"), "user_id")
    if validation_error:
        return validation_error
    try:
        response = (
            supabase.table("registrations")
            .select("id,user_id,event_id,created_at,events(id,title,capacity,status,organizer_id)")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return jsonify({"data": response.data or []})
    except (APIError, HTTPError) as exc:
        return database_error(exc)


@app.get("/api/events/<event_id>/registrations")
def event_registrations(event_id):
    """Public attendee list for now; organizer authorization will be added later."""
    _, validation_error = validate_uuid(event_id, "event_id")
    if validation_error:
        return validation_error
    try:
        if not get_event(event_id):
            return error("Event not found.", 404)
        response = (
            supabase.table("registrations")
            .select("id,user_id,event_id,created_at,users(id,email,role)")
            .eq("event_id", event_id)
            .order("created_at", desc=False)
            .execute()
        )
        return jsonify({"data": response.data or []})
    except (APIError, HTTPError) as exc:
        return database_error(exc)


@app.get("/<path:path>")
def frontend_route(path):
    """Return the frontend for client-side routes without masking API errors."""
    if path.startswith("api/"):
        return error("Endpoint not found.", 404)
    return send_from_directory(frontend_dist, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

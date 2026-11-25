import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

const icon = (name, className = '') => <span className={`material-symbols-outlined ${className}`}>{name}</span>;

function App() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [busyEvent, setBusyEvent] = useState('');
  const [notice, setNotice] = useState(null);
  const [attendeeEvent, setAttendeeEvent] = useState(null);

  const api = async (path, options) => {
    const response = await fetch(`${API_URL}${path}`, options);
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'Something went wrong.');
    return body.data ?? body;
  };

  const loadCore = async () => {
    setLoading(true);
    try {
      const [eventData, userData] = await Promise.all([api('/api/events'), api('/api/users')]);
      setEvents(eventData);
      setUsers(userData);
      const student = userData.find((user) => user.role === 'student') || userData[0];
      if (student) setSelectedUser((current) => current || student.id);
    } catch (error) {
      setNotice({ type: 'error', message: `Could not reach the API at ${API_URL}. Start the Flask server, then reload.` });
    } finally { setLoading(false); }
  };

  useEffect(() => { loadCore(); }, []);

  useEffect(() => {
    if (!selectedUser) return;
    api(`/api/me/registrations?user_id=${selectedUser}`)
      .then(setRegistrations)
      .catch((error) => setNotice({ type: 'error', message: error.message }));
  }, [selectedUser]);

  const registeredIds = useMemo(() => new Set(registrations.map((registration) => registration.event_id)), [registrations]);
  const filteredEvents = events.filter((event) => {
    const matchesStatus = status === 'all' || event.status === status;
    return matchesStatus && event.title.toLowerCase().includes(query.toLowerCase());
  });
  const selectedPerson = users.find((user) => user.id === selectedUser);

  const register = async (event) => {
    if (!selectedUser) return setNotice({ type: 'error', message: 'Choose a participant before registering.' });
    setBusyEvent(event.id);
    try {
      const registration = await api('/api/registrations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: selectedUser, event_id: event.id }),
      });
      setRegistrations((current) => [registration, ...current]);
      setNotice({ type: 'success', message: `You are registered for ${event.title}.` });
    } catch (error) { setNotice({ type: 'error', message: error.message }); }
    finally { setBusyEvent(''); }
  };

  const showAttendees = async (event) => {
    try {
      const people = await api(`/api/events/${event.id}/registrations`);
      setAttendeeEvent({ event, people });
    } catch (error) { setNotice({ type: 'error', message: error.message }); }
  };

  return <>
    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-mark">SU</span><span><strong>SUSHANT</strong><small>FEST 2026</small></span></a>
      <nav><a href="#events">Events</a><a href="#my-schedule">My schedule</a><a href="#about">About</a></nav>
      <a className="outline-button" href="#events">{icon('rocket_launch')} Explore now</a>
    </header>

    <main id="home">
      <section className="hero">
        <div className="grid-backdrop" />
        <div className="hero-content">
          <div className="eyebrow"><i /> REGISTRATIONS OPEN · 2026 EDITION</div>
          <h1>Build what’s <span>next.</span></h1>
          <p>A campus-wide constellation of workshops, coding sprints, and breakthrough ideas. Find your next challenge and reserve your place.</p>
          <div className="hero-actions"><a className="primary-button" href="#events">Browse events {icon('arrow_downward')}</a><a className="text-button" href="#my-schedule">My registrations {icon('calendar_month')}</a></div>
          <div className="metrics"><div><strong>{events.length || '—'}</strong><span>Live events</span></div><div><strong>{users.length || '—'}</strong><span>Participants</span></div><div><strong>01</strong><span>Campus portal</span></div></div>
        </div>
        <div className="signal-card"><div className="signal-head"><span>FEST STATUS</span><b>LIVE</b></div><div className="orbit"><span>2026</span></div><p>Explore. Register. Create.</p><small>UPDATED FROM CAMPUS API</small></div>
      </section>

      <section className="section" id="events">
        <div className="section-heading"><div><span className="section-kicker">DISCOVER THE PROGRAM</span><h2>Upcoming events</h2><p>Every event below is loaded directly from the registration service.</p></div><button className="reload" onClick={loadCore} disabled={loading}>{icon('refresh')} Refresh</button></div>
        <div className="toolbar"><label className="search">{icon('search')}<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events" /></label><div className="filters">{['upcoming', 'all'].map((value) => <button key={value} onClick={() => setStatus(value)} className={status === value ? 'active' : ''}>{value === 'all' ? 'All events' : 'Upcoming'}</button>)}</div></div>
        {loading ? <div className="empty-state">{icon('progress_activity', 'spin')} Loading the event registry…</div> : filteredEvents.length ? <div className="event-grid">{filteredEvents.map((event, index) => <article className="event-card" key={event.id}><div className={`card-accent accent-${index % 3}`} /><div className="event-top"><span className="status-dot">{event.status || 'upcoming'}</span><button className="icon-button" onClick={() => showAttendees(event)} aria-label={`View ${event.title} attendees`}>{icon('groups')}</button></div><h3>{event.title}</h3><p className="event-meta">{icon('groups')} Capacity: <b>{event.capacity ?? 'Open'}</b></p><p className="event-meta">{icon('hub')} {event.organizer_id ? 'Campus organizer' : 'Community event'}</p><div className="card-footer">{registeredIds.has(event.id) ? <span className="registered">{icon('check_circle')} Registered</span> : <button className="register-button" disabled={busyEvent === event.id} onClick={() => register(event)}>{busyEvent === event.id ? 'Registering…' : 'Register now'} {icon('arrow_forward')}</button>}</div></article>)}</div> : <div className="empty-state">{icon('event_busy')} No events match this view.</div>}
      </section>

      <section className="section schedule-section" id="my-schedule"><div className="section-heading"><div><span className="section-kicker">YOUR FEST PASS</span><h2>My schedule</h2><p>Select a participant to see their confirmed registrations.</p></div></div><div className="schedule-panel"><div className="participant-picker"><label htmlFor="participant">Viewing as</label><select id="participant" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}><option value="">Choose a participant</option>{users.map((user) => <option value={user.id} key={user.id}>{user.email} · {user.role}</option>)}</select><small>{selectedPerson ? `Participant ID: ${selectedPerson.id.slice(0, 8)}…` : 'No participant selected'}</small></div><div className="schedule-list">{registrations.length ? registrations.map((registration) => <div className="schedule-item" key={registration.id}>{icon('verified')}<div><strong>{registration.events?.title || 'Event registration'}</strong><span>Confirmed · {new Date(registration.created_at).toLocaleDateString()}</span></div><span className="schedule-cap">{registration.events?.capacity ?? '—'} seats</span></div>) : <div className="schedule-empty">{icon('calendar_add_on')} Your schedule is clear. Register for an event to see it here.</div>}</div></div></section>

      <section className="section why" id="about"><div><span className="section-kicker">ONE CAMPUS · ENDLESS IDEAS</span><h2>A festival built for the curious.</h2></div><div className="reason-grid"><div>{icon('code_blocks')}<h3>Hands-on learning</h3><p>Turn theory into prototypes with focused workshops and technical sessions.</p></div><div>{icon('diversity_3')}<h3>Open access</h3><p>No login wall. Choose a participant and reserve a seat in seconds.</p></div><div>{icon('auto_awesome')}<h3>Future-facing</h3><p>Connect with the people and projects shaping tomorrow’s campus.</p></div></div></section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">SU</span><strong>SUSHANT 2026</strong></a><p>Campus Innovation &amp; Cultural Fest</p><span>Powered by the Event Registration API</span></footer>
    {notice && <div className={`toast ${notice.type}`}>{icon(notice.type === 'success' ? 'check_circle' : 'error')}<span>{notice.message}</span><button onClick={() => setNotice(null)}>{icon('close')}</button></div>}
    {attendeeEvent && <div className="modal-backdrop" onMouseDown={() => setAttendeeEvent(null)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-head"><div><span className="section-kicker">ATTENDEE LIST</span><h2>{attendeeEvent.event.title}</h2></div><button className="icon-button" onClick={() => setAttendeeEvent(null)}>{icon('close')}</button></div>{attendeeEvent.people.length ? <ul className="attendee-list">{attendeeEvent.people.map((person) => <li key={person.id}><span>{person.users?.email?.slice(0, 1).toUpperCase() || '?'}</span><div><strong>{person.users?.email || 'Participant'}</strong><small>{person.users?.role || 'attendee'}</small></div><time>{new Date(person.created_at).toLocaleDateString()}</time></li>)}</ul> : <div className="modal-empty">No registrations yet—be the first to join.</div>}</div></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

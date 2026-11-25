---
name: Sushant 2026 Tech Fest
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#23b2ec'
  on-tertiary-container: '#00415a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-pill:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes an atmospheric, forward-looking aesthetic tailored for a premier collegiate technology symposium. The atmosphere fuses deep space environments with luminous spectral accents, evoking an intersection of rigorous academic discovery, cutting-edge engineering, and high-energy student hackathons.

### Visual Style
- **Aesthetic Direction**: High-Tech Collegiate Cyber-Minimalism layered with Frosted Glassmorphism.
- **Atmospheric Palette**: Inky dark voids punctuated by razor-sharp optical glows in electric cyan and vibrant violet.
- **Key Tenets**:
  - Focus on open access, competition timetables, project matrices, and hackathon schedules; explicitly eliminate all authentication friction (no login/signup triggers or user account barriers).
  - High-precision telemetry: micro-tags, terminal-like badges, and clean tabular data displays.
  - Controlled luminescence: subtle border gradients and backdrops with hardware-accelerated blur that guide user attention rather than overwhelm.

## Colors

The system uses an immersive dark canvas engineered specifically for low-light environments, auditoriums, and high-density technical screens.

### Palette Architecture
- **Primary Canvas (`#0b0f19`)**: Ground zero background, representing the outer space void.
- **Surface Elevation 1 (`#0f172a`)**: Base card containers, secondary table headers, and structural panels.
- **Surface Elevation 2 (`#111827`)**: Modal overlays, flyout menus, and active card states.
- **Primary Accent (`#06b6d4` - Luminous Cyan)**: Core CTAs, live timeline nodes, countdown clocks, and key interaction anchors.
- **Secondary Accent (`#8b5cf6` - Electric Violet)**: Track categories (e.g., AI/ML, Quantum, Web3), prize pool highlights, and keynote indicators.
- **Tertiary Accent (`#38bdf8` - Sky/Electric Blue)**: Interactive links, secondary chips, and telemetry hover states.
- **Neutral Accents**:
  - **Text Primary (`#f8fafc`)**: Maximum legibility for event headlines, titles, and critical schedule data.
  - **Text Secondary (`#94a3b8`)**: Venue, timestamps, speaker affiliations, and rules.
  - **Borders & Dividers (`#1e293b` with alpha transparency)**: Subtle perimeter boundaries.

## Typography

The typographic hierarchy pairs the structured, mechanical character of Space Grotesk for architectural titles with the neutral clarity of Geist for dense body copy. JetBrains Mono is deployed for technical metadata, timestamps, track codenames, and tabular venue records.

### Typographic Rules
- Headline capitalization prefers sentence casing with key technological markers preserved (e.g., `AI Hackathon 2026`, `Track: Autonomous Robotics`).
- Technical labels, table headers, and category tags utilize uppercase tracking with `label-pill` or `label-code` for maximum legibility in complex grids.

## Layout & Spacing

A 12-column responsive fluid grid designed to display concurrent track schedules, speaker rosters, and event rosters cleanly.

### Breakpoints & Layout Adaptations
- **Desktop (>= 1024px)**: 12-column grid with a `2rem` page margin and `1.5rem` gutter. Event tracks, interactive agenda tables, and prize breakdowns display across side-by-side modular panes.
- **Tablet (768px - 1023px)**: 8-column layout. Multi-track schedules switch to horizontally scrollable time tracks.
- **Mobile (< 768px)**: 4-column layout with `1rem` margin and `0.75rem` gutter. Data tables collapse into stacked cards with sticky chronological markers.

### Section Density
Spacing scales prioritize rhythm over airiness; tech fest documentation demands high information density balanced by precise vertical gaps (`space-lg` and `space-xl`) between tracks and agenda blocks.

## Elevation & Depth

Visual depth is achieved through glassmorphic translucency and directional optical glows rather than standard drop shadows.

### Elevation Levels
- **Base Canvas**: Surface color `#0b0f19` layered with an optional radial gradient centered at the viewport top (`radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.08), transparent 70%)`).
- **Layer 1 (Card & Module Shells)**: 
  - Fill: `rgba(15, 23, 42, 0.65)`
  - Backdrop Filter: `blur(12px)`
  - Border: 1px solid linear gradient (`rgba(56, 189, 248, 0.25)` top-left transitioning to `rgba(139, 92, 246, 0.1)` bottom-right).
- **Layer 2 (Hover & Active Containers)**:
  - Fill: `rgba(17, 24, 39, 0.85)`
  - Outer Glow: `0 0 20px -5px rgba(6, 182, 212, 0.35)`
  - Border: 1px solid `rgba(6, 182, 212, 0.6)`
- **Layer 3 (Modals / Focus Details)**:
  - Fill: `rgba(11, 15, 25, 0.95)`
  - Backdrop Filter: `blur(20px)`
  - Outer Glow: `0 0 30px -4px rgba(139, 92, 246, 0.3)`
  - Border: 1px solid `rgba(139, 92, 246, 0.5)`

## Shapes

The design uses balanced rounded geometry (`roundedness: 2`, base `0.5rem` / 8px) to temper futuristic angularity with contemporary product polish.

- **Standard Containers & Cards**: `rounded-md` (`0.5rem`) for technical cards, data tables, and schedule blocks.
- **Feature Cards & Hero Modules**: `rounded-lg` (`1rem`) to establish distinct focal points.
- **Pills, Status Badges, and Terminal Chips**: Fully rounded pill shapes (`9999px`) to offset rectilinear grid structures and emphasize state changes (e.g., `LIVE`, `SLOTS FULL`, `MAIN STAGE`).

## Components

### Buttons & Interactive Triggers
- **Primary Action (Register Project / Event RSVP)**:
  - Fill: Linear gradient from `#06b6d4` to `#38bdf8`.
  - Text: `#0b0f19` in `Space Grotesk`, semi-bold weight.
  - Hover: Subtle luminance boost with `box-shadow: 0 0 16px rgba(6, 182, 212, 0.5)`.
- **Secondary Action (Download Rulebook / Add to Calendar)**:
  - Fill: Translucent `rgba(15, 23, 42, 0.7)`.
  - Border: 1px solid `rgba(56, 189, 248, 0.4)`.
  - Text: `#38bdf8`.
  - Hover: Border color transitions to `#06b6d4` with `rgba(6, 182, 212, 0.1)` background tint.
- *Strict Note*: No login, account creation, or authenticated user access states exist in this system.

### Frosted Glass Cards
- Background: `rgba(15, 23, 42, 0.6)`.
- Backdrop filter: `blur(12px)`.
- Border: 1px solid `rgba(255, 255, 255, 0.08)`.
- Dynamic Accent: Cards highlight corresponding track colors via a 2px top gradient accent bar (`#06b6d4` for Hackathons, `#8b5cf6` for Symposia/Keynotes).

### Glowing Pill Tags & Status Badges
- Base: `JetBrains Mono` at `11px`, all caps, tracking +0.08em.
- Live Status Pill: Background `rgba(6, 182, 212, 0.15)`, Border `1px solid rgba(6, 182, 212, 0.5)`, Text `#06b6d4`, accompanied by an animated pulsating green or cyan ping indicator.
- Category Pill (e.g., "QUANTUM", "CYBER"): Background `rgba(139, 92, 246, 0.15)`, Border `1px solid rgba(139, 92, 246, 0.4)`, Text `#c4b5fd`.

### Structured Event Metadata Tables & Schedules
- Table Header: Uppercase monospaced typography (`label-code`), `rgba(148, 163, 184, 0.8)`, background `rgba(11, 15, 25, 0.8)`.
- Grid Alignment: Crisp division lines (`1px solid rgba(30, 41, 59, 0.6)`).
- Time Nodes: Highlighted in `#38bdf8` with monospace numerals.
- Hover Interaction: Entire schedule row activates with a low-opacity cyan sweep (`rgba(6, 182, 212, 0.04)`).

### Input Fields (Event Search & Filter)
- Background: `rgba(15, 23, 42, 0.8)`.
- Border: `1px solid #1e293b`.
- Text: `#f8fafc`.
- Focus: Outer glow `0 0 0 2px rgba(6, 182, 212, 0.3)`, Border `#06b6d4`.
- Iconography: Terminal-inspired search cues and filter tags.
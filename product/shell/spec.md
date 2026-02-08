# Application Shell Specification

## Overview
Flashy uses a mobile-first bottom tab bar navigation pattern, designed for quick one-handed use on a phone. A minimal top header provides page context (title, back button) while the bottom tabs give persistent access to all major sections.

## Navigation Structure
- **Decks** (Layers icon) → Deck Management (default/home view)
- **Practice** (GraduationCap icon) → Practice Session
- **Upload** (Camera icon) → Card Upload
- **Progress** (BarChart3 icon) → Dashboard
- **Settings** (Settings icon) → Settings & Account

## User Menu
User profile and account management are accessed via the Settings tab. No separate user menu in the header — keeps the shell minimal for mobile use.

## Layout Pattern
- **Top header:** Minimal bar with page title (left-aligned) and optional back button. No logo in header on inner pages — the app name only appears on the Decks home view.
- **Content area:** Scrollable, full-width on mobile, max-width container on larger screens.
- **Bottom tab bar:** 5 equally-spaced tabs with icon and label. Active tab uses primary color (violet), inactive tabs use neutral (slate).

## Responsive Behavior
- **Mobile:** Full-width content, bottom tab bar fixed to bottom, top header with page title
- **Tablet:** Centered content with max-width (640px), bottom tab bar persists
- **Desktop:** Centered content with max-width (768px), bottom tab bar persists (consistent PWA experience)

## Design Notes
- Bottom tab bar has a subtle top border and elevated background (white in light mode, slate-900 in dark mode)
- Active tab icon and label use violet-600 (light) / violet-400 (dark)
- Inactive tabs use slate-400 (light) / slate-500 (dark)
- Page transitions should feel instant — no heavy animations
- The header hides when not needed (e.g., during a practice session for immersive focus)
- Safe area padding for iOS notch/home indicator

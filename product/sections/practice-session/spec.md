# Practice Session Specification

## Overview
Practice Session is an immersive flashcard drilling mode using spaced repetition (SM-2). Users pick a deck, choose a direction, and work through due cards one at a time. The session hides navigation for focus and ends with a summary of results.

## User Flows
- Tap Practice tab to open session setup screen
- Pick a deck (due card counts shown per deck), choose direction (Spanish→English or English→Spanish, defaulting to ES→EN), adjust card count (defaults to 20 from settings)
- Tap Start to enter immersive card drill (shell header and nav hidden)
- See card front, tap to flip, see answer, then rate: Again / Hard / Good / Easy
- Progress bar advances on Good/Easy, stays for Again (retried up to max retries from settings)
- After all cards complete: summary screen with stats and problem cards
- Tap Done to return to normal app with nav restored
- Can exit early via X button during drill

## UI Requirements
- Setup screen with deck list showing deck name + due card count, direction toggle, card count selector, and prominent Start button
- **Deck list limited to 3 decks** to keep Start button above the fold (shows selected deck first, then top 2 by due count; "View all decks" link shown if more than 3 exist)
- **Deck ordering maintained** - same priority order (selected first, then by due count) whether collapsed or expanded
- **Scrollable expansion** - when "View all decks" is clicked and there are 6+ decks, list becomes scrollable (max-height ~6-7 deck cards) to prevent excessive page length
- **Minimal header** - no subtitle, just "Practice Session" title to save vertical space
- Large centered card with generous padding, violet card face with white text for prompt side (inspired by reference designs)
- Flip animation on tap (CSS transform)
- Rating buttons styled to match the palette (slate for Again/Hard, sky for Good, violet for Easy)
- Progress bar at top with violet fill
- Immersive mode: shell header and bottom nav hidden during card drill
- Exit button (X) available during drill to quit early
- Summary screen: first-attempt breakdown by rating (stat cards or chart), list of cards rated Hard or Again showing prompt + answer + rating

## Configuration
- shell: true

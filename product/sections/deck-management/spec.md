# Deck Management Specification

## Overview
Deck Management is the home view of Flashy. It displays all flashcard decks with summary stats and lets users drill into any deck to browse, edit, and organize cards. A default deck always exists and receives new cards automatically.

## User Flows
- Browse decks and see at-a-glance stats (card count, review count, confidence)
- Tap a deck to see its cards and detailed stats
- Create a new deck (name, color)
- Edit a deck (name, color)
- Delete a deck with confirmation dialog (move cards to default deck or delete them)
- Tap a card to edit via slide-up sheet (front, back, notes, deck assignment)
- Bulk select cards and move them to a different deck
- Default deck is always present, pinned at top, cannot be deleted

## UI Requirements
- Deck list as the primary home view with color swatch, name, card count, and confidence indicator per deck
- Default deck visually distinguished and pinned at top
- Deck detail view with stats banner at top (total cards, reviews done, overall confidence)
- Card list within a deck shows front text, back text preview, and last-reviewed indicator
- Bulk mode activated via long-press or toggle, with batch action bar at bottom
- Slide-up bottom sheet for card editing (front, back, notes, deck picker)
- Empty state for new users (only default deck, prompt to upload or create cards)

## Configuration
- shell: true

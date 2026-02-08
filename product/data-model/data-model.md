# Data Model

## Entities

### User
API key-based identity for syncing flashcard data between devices. Manages authentication via hashed API keys.

### Deck
A named, color-coded collection of cards organized by language level (B1.1, B1.2) or custom topic. Tracks its card count and supports soft deletion.

### Card
A flashcard with front (Spanish) and back (English) text, a card type (e.g. word, phrase), and optional notes. Embeds SM-2 spaced repetition state directly — ease factor, interval, repetitions, next/last review dates, lapses, and review/correct counts. May reference the source image it was extracted from.

### ImageJob
An OCR processing job triggered when a user uploads notebook photos. Tracks processing status (pending, complete, error) and stores the extracted candidate cards as structured data for the user to review, edit, and approve before adding to a deck.

### Image
An uploaded notebook photo stored in Cloudflare R2. Tracks the storage key and retention policy (keep forever or auto-expire).

## Relationships

- User has many Decks
- User has many Cards
- User has many ImageJobs
- User has many Images
- Deck has many Cards
- Card may reference a source Image
- ImageJob produces candidate Cards for user review

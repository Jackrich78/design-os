# Flashy

## Description
Flashy is a mobile-first language learning app that turns handwritten class notes into organized, practice-ready flashcard decks. Snap a photo of your notebook, let OCR and AI extract and validate the content, then drill yourself using spaced repetition — all from your phone.

## Problems & Solutions

### Problem 1: Scattered Study Materials
Class notes stay in notebooks and never get reviewed systematically. Flashy captures them digitally, organizes them into decks by level or topic, and schedules them for systematic review using spaced repetition.

### Problem 2: Manual Card Creation Is Tedious
Typing flashcards one-by-one from handwritten notes kills motivation. Flashy uses OCR on notebook photos plus LLM validation to bulk-create accurate cards in seconds.

### Problem 3: Generic Flashcard Content
Existing apps offer pre-made decks, not your actual class material. Flashy lets you build decks directly from your lessons — B1.1 phrases, B1.2 grammar, and so on — so you're always studying what's relevant.

### Problem 4: No Feedback on Progress
It's hard to know what you've mastered versus what needs more work. Flashy tracks performance with spaced repetition scoring and a progress dashboard so you can focus your effort where it matters.

## Key Features
- Photo-to-card pipeline (OCR + LLM validation + review before adding)
- Deck management organized by level, topic, or custom grouping
- Spaced repetition practice with difficulty ratings (easy/medium/hard/again)
- Bidirectional practice (Spanish→English and English→Spanish)
- Progress dashboard with scores across cards and decks
- PWA — works on mobile and desktop, installable
- Built on Cloudflare Workers with D1 storage
- Optional authentication for future multi-user support

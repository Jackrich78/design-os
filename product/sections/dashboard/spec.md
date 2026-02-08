# Dashboard Specification

## Overview
The Dashboard gives a high-level view of study progress and helps identify what needs attention. It surfaces due cards, tracks review activity over time, and highlights weak spots across decks.

## User Flows
- Open Progress tab to see overall study status
- View due cards summary and tap to start a practice session directly
- See review activity over time (daily review counts)
- Filter stats by deck or view all decks
- Spot weak cards that need more practice
- Track study streak

## UI Requirements
- "Due today" banner at top with card count and deck breakdown, tappable to start a practice session
- Stats row: total cards, total reviews, current streak
- Review activity chart (daily bar chart or heatmap for last 2-4 weeks)
- Per-deck breakdown: confidence score, card count, mastery distribution (new / learning / reviewing / mastered)
- Deck filter to focus on a single deck's stats
- Weak cards section: cards with lowest confidence or most lapses, showing Spanish + English
- Empty state for new users with no review history yet

## Configuration
- shell: true

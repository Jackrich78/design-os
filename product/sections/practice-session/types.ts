// =============================================================================
// Data Types
// =============================================================================

export interface Deck {
  id: string
  name: string
  description: string | null
  color: string
  cardCount: number
  dueCount: number
  isDefault: boolean
}

export interface Card {
  id: string
  deckId: string
  front: string
  back: string
  notes: string | null
  cardType: 'word' | 'phrase'
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: string | null
  lastReview: string | null
  lapses: number
  reviewCount: number
  correctCount: number
}

export interface PracticeConfig {
  selectedDeckId: string
  direction: 'es-to-en' | 'en-to-es'
  cardLimit: number
}

export interface SessionSummary {
  deckId: string
  direction: 'es-to-en' | 'en-to-es'
  completedAt: string
  totalCards: number
  ratings: {
    again: number
    hard: number
    good: number
    easy: number
  }
  problemCards: ProblemCard[]
}

export interface ProblemCard {
  cardId: string
  front: string
  back: string
  rating: 'again' | 'hard'
}

// =============================================================================
// Component Props
// =============================================================================

export interface PracticeSetupProps {
  /** All decks with due counts */
  decks: Deck[]
  /** Current practice configuration */
  config: PracticeConfig
  /** Called when user selects a deck */
  onSelectDeck?: (deckId: string) => void
  /** Called when user changes direction (ES→EN or EN→ES) */
  onChangeDirection?: (direction: 'es-to-en' | 'en-to-es') => void
  /** Called when user adjusts card count limit */
  onChangeCardLimit?: (limit: number) => void
  /** Called when user taps Start to begin the practice session */
  onStart?: () => void
}

export interface PracticeDrillProps {
  /** The current card being reviewed */
  currentCard: Card
  /** Whether the card is flipped (showing answer) */
  isFlipped: boolean
  /** Current position in the session (1-based) */
  currentIndex: number
  /** Total number of cards in this session */
  totalCards: number
  /** Practice direction */
  direction: 'es-to-en' | 'en-to-es'
  /** Called when user taps the card to flip it */
  onFlip?: () => void
  /** Called when user rates the card */
  onRate?: (rating: 'again' | 'hard' | 'good' | 'easy') => void
  /** Called when user exits the session early */
  onExit?: () => void
}

export interface PracticeSummaryProps {
  /** Summary of the completed session */
  summary: SessionSummary
  /** Called when user taps Done to return to the app */
  onDone?: () => void
  /** Called when user wants to retry problem cards */
  onRetryProblemCards?: () => void
}

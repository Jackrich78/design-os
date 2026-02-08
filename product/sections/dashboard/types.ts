// =============================================================================
// Data Types
// =============================================================================

export interface MasteryBreakdown {
  new: number
  learning: number
  reviewing: number
  mastered: number
}

export interface Deck {
  id: string
  name: string
  description: string | null
  color: string
  cardCount: number
  dueCount: number
  totalReviews: number
  /** Confidence score as a percentage (0-100), derived from card review accuracy */
  confidence: number
  mastery: MasteryBreakdown
}

export interface WeakCard {
  id: string
  deckId: string
  front: string
  back: string
  easeFactor: number
  lapses: number
  reviewCount: number
  correctCount: number
  /** Confidence percentage (0-100) */
  confidence: number
}

export interface DashboardStats {
  totalCards: number
  totalReviews: number
  currentStreak: number
  lastReviewDate: string
}

export interface DeckDueSummary {
  deckId: string
  deckName: string
  deckColor: string
  dueCount: number
}

export interface DueCardsSummary {
  totalDue: number
  byDeck: DeckDueSummary[]
}

export interface ReviewActivity {
  date: string
  count: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface DashboardOverviewProps {
  /** Overall study statistics */
  stats: DashboardStats
  /** Cards due today with per-deck breakdown */
  dueCardsSummary: DueCardsSummary
  /** Daily review counts for the chart (last 28 days) */
  reviewActivity: ReviewActivity[]
  /** Called when user taps the due cards banner to start practice */
  onStartPractice?: () => void
}

export interface DeckStatsProps {
  /** All decks with stats */
  decks: Deck[]
  /** Currently selected deck ID for filtering (null = all decks) */
  selectedDeckId: string | null
  /** Called when user selects a deck to filter stats */
  onSelectDeck?: (deckId: string | null) => void
}

export interface WeakCardsListProps {
  /** Cards that need more practice (low confidence or high lapses) */
  weakCards: WeakCard[]
  /** All decks for displaying deck colors/names */
  decks: Deck[]
  /** Called when user taps a weak card to review it */
  onReviewCard?: (cardId: string) => void
}

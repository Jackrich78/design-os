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
  isDefault: boolean
  dueCount: number
  totalReviews: number
  /** Confidence score as a percentage (0-100), derived from card review accuracy */
  confidence: number
  mastery: MasteryBreakdown
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
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
  sourceImageId: string | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface DeckListProps {
  /** All decks to display, default deck should be first */
  decks: Deck[]
  /** Called when user taps a deck to view its cards */
  onSelectDeck?: (deckId: string) => void
  /** Called when user wants to create a new deck */
  onCreateDeck?: () => void
  /** Called when user wants to edit a deck (name, color, description) */
  onEditDeck?: (deckId: string) => void
  /** Called when user wants to delete a deck (shows confirmation dialog) */
  onDeleteDeck?: (deckId: string) => void
}

export interface DeckDetailProps {
  /** The deck being viewed */
  deck: Deck
  /** Cards belonging to this deck */
  cards: Card[]
  /** All decks, used for the deck picker when moving cards */
  allDecks: Deck[]
  /** Called when user taps a card to edit via slide-up sheet */
  onEditCard?: (cardId: string) => void
  /** Called when user bulk-moves selected cards to another deck */
  onMoveCards?: (cardIds: string[], targetDeckId: string) => void
  /** Called when user wants to edit the deck itself */
  onEditDeck?: (deckId: string) => void
  /** Called when user wants to delete the deck */
  onDeleteDeck?: (deckId: string) => void
  /** Called when user taps back to return to deck list */
  onBack?: () => void
}

export interface CardEditSheetProps {
  /** The card being edited, or null if creating a new card */
  card: Card | null
  /** All decks for the deck picker */
  decks: Deck[]
  /** Called when user saves changes to the card */
  onSave?: (card: { front: string; back: string; notes: string | null; deckId: string }) => void
  /** Called when user dismisses the sheet without saving */
  onClose?: () => void
}

export interface EditDeckSheetProps {
  /** The deck being edited */
  deck: Deck
  /** Called when user saves changes to the deck */
  onSave?: (deck: { name: string; description: string | null; color: string }) => void
  /** Called when user dismisses the sheet without saving */
  onClose?: () => void
}

export interface DeleteDeckDialogProps {
  /** The deck being deleted */
  deck: Deck
  /** Called when user confirms deletion and chooses to move cards to default deck */
  onDeleteAndMoveCards?: (deckId: string) => void
  /** Called when user confirms deletion and chooses to delete cards too */
  onDeleteWithCards?: (deckId: string) => void
  /** Called when user cancels the deletion */
  onCancel?: () => void
}

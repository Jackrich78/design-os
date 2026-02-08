// =============================================================================
// Data Types
// =============================================================================

export interface ImageJob {
  id: string
  userId: string
  /** R2 key for the uploaded image (matches images.r2Key) */
  imageKey: string
  status: 'pending' | 'processing' | 'complete' | 'error'
  /** JSON string containing OcrCandidate[] */
  candidates: string | null
  errorMessage: string | null
  createdAt: string
  updatedAt: string
}

export interface OCRCandidate {
  id: string
  imageJobId: string
  front: string
  back: string
  cardType: 'word' | 'phrase'
  /** AI confidence score from 0 to 1 */
  confidence: number
  /** null = not reviewed yet, true = accepted, false = rejected */
  accepted: boolean | null
}

export interface Image {
  id: string
  userId: string
  /** R2 storage key */
  r2Key: string
  /** If true, image is kept permanently; if false, auto-expires */
  keepForever: boolean
  createdAt: string
  expiresAt: string | null
}

export interface Deck {
  id: string
  name: string
  description: string | null
  color: string
  isDefault: boolean
}

// =============================================================================
// Component Props
// =============================================================================

export interface UploadHubProps {
  /** Called when user taps "Upload photo" button */
  onUploadPhoto?: () => void
  /** Called when user taps "Add manually" button */
  onAddManually?: () => void
}

export interface PhotoUploadProcessingProps {
  /** The image job being processed */
  job: ImageJob
  /** Called when user cancels the upload (if still processing) */
  onCancel?: () => void
}

export interface OCRReviewProps {
  /** All candidates extracted from the photo */
  candidates: OCRCandidate[]
  /** All decks for the deck picker */
  decks: Deck[]
  /** Currently selected deck ID (defaults to default deck) */
  selectedDeckId: string
  /** Called when user edits a candidate's front or back text inline */
  onEditCandidate?: (candidateId: string, field: 'front' | 'back', value: string) => void
  /** Called when user accepts a candidate */
  onAcceptCandidate?: (candidateId: string) => void
  /** Called when user rejects a candidate */
  onRejectCandidate?: (candidateId: string) => void
  /** Called when user clears their decision (returns to pending) */
  onClearCandidate?: (candidateId: string) => void
  /** Called when user selects a target deck */
  onSelectDeck?: (deckId: string) => void
  /** Called when user saves all accepted candidates to the chosen deck */
  onSave?: (acceptedCandidateIds: string[], deckId: string) => void
  /** Called when user cancels the review and discards all candidates */
  onCancel?: () => void
}

export interface ManualAddFormProps {
  /** All decks for the deck picker */
  decks: Deck[]
  /** Called when user saves a new card */
  onSave?: (card: { front: string; back: string; notes: string | null; deckId: string }) => void
  /** Called when user cancels the form */
  onCancel?: () => void
}

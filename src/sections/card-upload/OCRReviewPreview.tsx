import { useState } from 'react'
import data from '@/../product/sections/card-upload/data.json'
import { OCRReview } from './components/OCRReview'
import type { OCRCandidate, Deck } from '@/../product/sections/card-upload/types'

const decks = data.decks as Deck[]
const sampleCandidates = data.ocrCandidates as OCRCandidate[]

export default function OCRReviewPreview() {
  const [candidates, setCandidates] = useState<OCRCandidate[]>(sampleCandidates)
  const [selectedDeckId, setSelectedDeckId] = useState(decks.find(d => d.isDefault)?.id || decks[0]?.id || '')

  const handleEditCandidate = (candidateId: string, field: 'front' | 'back', value: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, [field]: value } : c
      )
    )
  }

  const handleAcceptCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, accepted: true } : c
      )
    )
  }

  const handleRejectCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, accepted: false } : c
      )
    )
  }

  const handleClearCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId ? { ...c, accepted: null } : c
      )
    )
  }

  return (
    <OCRReview
      candidates={candidates}
      decks={decks}
      selectedDeckId={selectedDeckId}
      onEditCandidate={handleEditCandidate}
      onAcceptCandidate={handleAcceptCandidate}
      onRejectCandidate={handleRejectCandidate}
      onClearCandidate={handleClearCandidate}
      onSelectDeck={setSelectedDeckId}
      onSave={(acceptedIds, deckId) => {
        const selectedDeck = decks.find(d => d.id === deckId)
        alert(`Saved ${acceptedIds.length} cards to "${selectedDeck?.name}"!\n\nIn real app, would navigate back to deck list.`)
      }}
      onCancel={() => {
        alert('Cancelled! In real app, would return to upload hub.')
      }}
    />
  )
}

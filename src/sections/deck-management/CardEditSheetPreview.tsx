import data from '@/../product/sections/deck-management/data.json'
import { CardEditSheet } from './components/CardEditSheet'
import type { Card, Deck } from '@/../product/sections/deck-management/types'

const decks = data.decks as Deck[]
const cards = data.cards as Card[]

// Use a card from B1.1 Phrases deck for the preview
const sampleCard = cards.find(c => c.id === 'card-004')!

export default function CardEditSheetPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Simulated background content (DeckDetail would be here) */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              B1.1 Phrases
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Background content - in real app, this would be the DeckDetail screen
            </p>
          </div>
        </div>
      </div>

      {/* Card Edit Sheet overlay */}
      <CardEditSheet
        card={sampleCard}
        decks={decks}
        onSave={(card) => {
          console.log('Save card:', card)
          alert('Card saved! In real app, sheet would close and return to DeckDetail.')
        }}
        onClose={() => {
          console.log('Sheet closed')
          alert('Sheet closed! In real app, would return to DeckDetail.')
        }}
      />
    </div>
  )
}

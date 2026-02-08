import data from '@/../product/sections/deck-management/data.json'
import { EditDeckSheet } from './components/EditDeckSheet'
import type { Deck } from '@/../product/sections/deck-management/types'

const decks = data.decks as Deck[]

// Use B1.1 Phrases deck for the preview
const sampleDeck = decks.find(d => d.id === 'deck-b11')!

export default function EditDeckSheetPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Simulated background content (DeckDetail would be here) */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl"
                style={{ backgroundColor: sampleDeck.color }}
              />
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {sampleDeck.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {sampleDeck.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Deck Sheet overlay */}
      <EditDeckSheet
        deck={sampleDeck}
        onSave={(deck) => {
          console.log('Save deck:', deck)
          alert(`Deck updated!\nName: ${deck.name}\nDescription: ${deck.description || 'None'}\nColor: ${deck.color}`)
        }}
        onClose={() => {
          console.log('Sheet closed')
          alert('Edit cancelled. Returning to deck.')
        }}
      />
    </div>
  )
}

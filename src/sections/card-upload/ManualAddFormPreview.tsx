import data from '@/../product/sections/card-upload/data.json'
import { ManualAddForm } from './components/ManualAddForm'
import type { Deck } from '@/../product/sections/card-upload/types'

const decks = data.decks as Deck[]

export default function ManualAddFormPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Simulated background content (Upload Hub would be here) */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Add Cards
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Background content - in real app, this would be the Upload Hub
            </p>
          </div>
        </div>
      </div>

      {/* Manual Add Form overlay */}
      <ManualAddForm
        decks={decks}
        onSave={(card) => {
          const deck = decks.find(d => d.id === card.deckId)
          alert(`Card added to "${deck?.name}"!\n\nSpanish: ${card.front}\nEnglish: ${card.back}\nNotes: ${card.notes || 'None'}\n\nIn real app, would return to Upload Hub.`)
        }}
        onCancel={() => {
          alert('Cancelled! In real app, would return to Upload Hub.')
        }}
      />
    </div>
  )
}

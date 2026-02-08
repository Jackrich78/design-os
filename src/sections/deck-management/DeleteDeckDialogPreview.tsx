import data from '@/../product/sections/deck-management/data.json'
import { DeleteDeckDialog } from './components/DeleteDeckDialog'
import type { Deck } from '@/../product/sections/deck-management/types'

const decks = data.decks as Deck[]

// Use B1.2 Grammar deck (has cards) for the primary preview
const deckWithCards = decks.find(d => d.id === 'deck-b12')!
// Kitchen Vocabulary deck (empty) for comparison
// const emptyDeck = decks.find(d => d.id === 'deck-kitchen')!

export default function DeleteDeckDialogPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Simulated background content (DeckDetail would be here) */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Deck Management
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Background content - in real app, this would be the DeckDetail screen
            </p>
          </div>
        </div>
      </div>

      {/* Delete Deck Dialog overlay */}
      <DeleteDeckDialog
        deck={deckWithCards}
        onDeleteAndMoveCards={(deckId) => {
          console.log('Delete deck and move cards:', deckId)
          alert(`Deck "${deckWithCards.name}" deleted. ${deckWithCards.cardCount} cards moved to default deck.`)
        }}
        onDeleteWithCards={(deckId) => {
          console.log('Delete deck with all cards:', deckId)
          alert(`Deck "${deckWithCards.name}" and all ${deckWithCards.cardCount} cards permanently deleted.`)
        }}
        onCancel={() => {
          console.log('Cancel delete')
          alert('Delete cancelled. Returning to deck.')
        }}
      />
    </div>
  )
}

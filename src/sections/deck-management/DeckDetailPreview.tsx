import { DeckDetail } from './components/DeckDetail'
import sampleData from '@/../product/sections/deck-management/data.json'
import type { Deck, Card } from '@/../product/sections/deck-management/types'

const decks = sampleData.decks as Deck[]
const cards = sampleData.cards as Card[]

// Use the B1.1 Phrases deck for the preview
const deck = decks.find(d => d.id === 'deck-b11')!
const deckCards = cards.filter(c => c.deckId === deck.id)

export default function DeckDetailPreview() {
  return (
    <DeckDetail
      deck={deck}
      cards={deckCards}
      allDecks={decks}
      onEditCard={(cardId) => console.log('Edit card:', cardId)}
      onMoveCards={(cardIds, targetDeckId) => console.log('Move cards:', cardIds, 'to', targetDeckId)}
      onEditDeck={(deckId) => console.log('Edit deck:', deckId)}
      onDeleteDeck={(deckId) => console.log('Delete deck:', deckId)}
      onBack={() => console.log('Back to deck list')}
    />
  )
}

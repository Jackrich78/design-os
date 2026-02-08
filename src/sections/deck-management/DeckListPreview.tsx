import data from '@/../product/sections/deck-management/data.json'
import { DeckList } from './components/DeckList'

export default function DeckListPreview() {
  return (
    <DeckList
      decks={data.decks}
      onSelectDeck={(id) => console.log('Select deck:', id)}
      onCreateDeck={() => console.log('Create new deck')}
      onEditDeck={(id) => console.log('Edit deck:', id)}
      onDeleteDeck={(id) => console.log('Delete deck:', id)}
    />
  )
}

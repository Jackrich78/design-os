import { useState } from 'react'
import data from '@/../product/sections/practice-session/data.json'
import { PracticeSetup } from './components/PracticeSetup'

export default function PracticeSetupPreview() {
  const [config, setConfig] = useState(data.practiceConfig)

  return (
    <PracticeSetup
      decks={data.decks}
      config={config}
      onSelectDeck={(deckId) => {
        console.log('Select deck:', deckId)
        setConfig({ ...config, selectedDeckId: deckId })
      }}
      onChangeDirection={(direction) => {
        console.log('Change direction:', direction)
        setConfig({ ...config, direction })
      }}
      onChangeCardLimit={(limit) => {
        console.log('Change card limit:', limit)
        setConfig({ ...config, cardLimit: limit })
      }}
      onStart={() => console.log('Start practice with config:', config)}
    />
  )
}

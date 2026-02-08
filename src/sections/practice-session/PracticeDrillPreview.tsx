import { useState } from 'react'
import data from '@/../product/sections/practice-session/data.json'
import { PracticeDrill } from './components/PracticeDrill'

export default function PracticeDrillPreview() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(1)

  // Get a due card for the preview
  const dueCards = data.cards.filter(c => c.nextReview && new Date(c.nextReview) <= new Date())
  const currentCard = dueCards[0] || data.cards[0]

  const handleRate = (rating: string) => {
    console.log('Rate card:', rating)
    setIsFlipped(false)
    // Simulate moving to next card
    if (currentIndex < 5) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <PracticeDrill
      currentCard={currentCard}
      isFlipped={isFlipped}
      currentIndex={currentIndex}
      totalCards={5}
      direction="es-to-en"
      onFlip={() => setIsFlipped(!isFlipped)}
      onRate={handleRate}
      onExit={() => console.log('Exit practice')}
    />
  )
}

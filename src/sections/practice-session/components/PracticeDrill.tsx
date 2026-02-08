import type { PracticeDrillProps } from '@/../product/sections/practice-session/types'
import { useState } from 'react'

export function PracticeDrill({
  currentCard,
  isFlipped,
  currentIndex,
  totalCards,
  direction,
  onFlip,
  onRate,
  onExit
}: PracticeDrillProps) {
  const prompt = direction === 'es-to-en' ? currentCard.front : currentCard.back
  const answer = direction === 'es-to-en' ? currentCard.back : currentCard.front

  const progress = (currentIndex / totalCards) * 100

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Full-screen background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
      {/* Top bar: Progress + Exit */}
      <div className="flex-shrink-0 px-4 pt-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {currentIndex} / {totalCards}
            </span>
            <button
              onClick={onExit}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Exit practice"
            >
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-sky-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card container - centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Flashcard */}
          <button
            onClick={onFlip}
            className="w-full aspect-[4/3] relative group perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-500 preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front side (prompt) */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center leading-relaxed">
                  {prompt}
                </p>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <span className="text-white/60 text-sm font-medium">Tap to flip</span>
                </div>
              </div>

              {/* Back side (answer) */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border-2 border-slate-200 dark:border-slate-700"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 text-center leading-relaxed">
                  {answer}
                </p>
                {currentCard.notes && (
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
                    {currentCard.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Flip hint (only when not flipped) */}
            {!isFlipped && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white text-sm font-medium">Tap to reveal</span>
                </div>
              </div>
            )}
          </button>

          {/* Rating buttons (only show when flipped) */}
          {isFlipped && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-in">
              <button
                onClick={() => onRate?.('again')}
                className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border-2 border-slate-300 dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-400 transition-all group"
              >
                <span className="text-base font-semibold text-slate-600 dark:text-slate-300">Again</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">&lt;1 min</span>
              </button>

              <button
                onClick={() => onRate?.('hard')}
                className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border-2 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all group"
              >
                <span className="text-base font-semibold text-slate-500 dark:text-slate-400">Hard</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">&lt;6 min</span>
              </button>

              <button
                onClick={() => onRate?.('good')}
                className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border-2 border-sky-200 dark:border-sky-900/30 hover:border-sky-400 dark:hover:border-sky-700 transition-all group"
              >
                <span className="text-base font-semibold text-sky-600 dark:text-sky-400">Good</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">&lt;10 min</span>
              </button>

              <button
                onClick={() => onRate?.('easy')}
                className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border-2 border-violet-200 dark:border-violet-900/30 hover:border-violet-400 dark:hover:border-violet-700 transition-all group"
              >
                <span className="text-base font-semibold text-violet-600 dark:text-violet-400">Easy</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">4+ days</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

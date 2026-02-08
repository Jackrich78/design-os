import { useState } from 'react'
import type { OCRReviewProps } from '@/../product/sections/card-upload/types'

export function OCRReview({
  candidates,
  decks,
  selectedDeckId,
  onEditCandidate,
  onAcceptCandidate,
  onRejectCandidate,
  onClearCandidate,
  onSelectDeck,
  onSave,
  onCancel
}: OCRReviewProps) {
  const [showDeckPicker, setShowDeckPicker] = useState(false)
  const [editingField, setEditingField] = useState<{ candidateId: string; field: 'front' | 'back' } | null>(null)

  const selectedDeck = decks.find(d => d.id === selectedDeckId)
  const acceptedCount = candidates.filter(c => c.accepted === true).length
  const rejectedCount = candidates.filter(c => c.accepted === false).length
  const pendingCount = candidates.filter(c => c.accepted === null).length
  const hasAccepted = acceptedCount > 0

  const handleSave = () => {
    const acceptedIds = candidates.filter(c => c.accepted === true).map(c => c.id)
    onSave?.(acceptedIds, selectedDeckId)
  }

  const handleAcceptAll = () => {
    candidates.forEach(c => {
      if (c.accepted === null) {
        onAcceptCandidate?.(c.id)
      }
    })
  }

  const handleClearAll = () => {
    candidates.forEach(c => {
      if (c.accepted !== null) {
        onClearCandidate?.(c.id)
      }
    })
  }

  return (
    <div className="relative min-h-screen">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Review Cards
            </h1>
            <button
              onClick={onCancel}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              {candidates.length} extracted
            </span>
            {acceptedCount > 0 && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {acceptedCount} accepted
                </span>
              </>
            )}
            {rejectedCount > 0 && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {rejectedCount} rejected
                </span>
              </>
            )}
          </div>
        </div>

        {/* Quick actions */}
        {(pendingCount > 0 || acceptedCount > 0 || rejectedCount > 0) && (
          <div className="mb-4 flex items-center gap-4">
            {pendingCount > 0 && (
              <button
                onClick={handleAcceptAll}
                className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Accept all {pendingCount}
              </button>
            )}
            {(acceptedCount > 0 || rejectedCount > 0) && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Candidate list */}
        <div className="space-y-3">
          {candidates.map(candidate => {
            const isAccepted = candidate.accepted === true
            const isRejected = candidate.accepted === false
            const isPending = candidate.accepted === null

            return (
              <div
                key={candidate.id}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border transition-all ${
                  isRejected
                    ? 'opacity-50 border-slate-200 dark:border-slate-700'
                    : isAccepted
                    ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-900/30'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-4">
                  {/* Card type and confidence */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 capitalize">
                      {candidate.cardType}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {Math.round(candidate.confidence * 100)}% confident
                    </span>
                  </div>

                  {/* Front/Back fields */}
                  <div className="space-y-3 mb-4">
                    {/* Front (Spanish) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Spanish
                      </label>
                      <input
                        type="text"
                        value={candidate.front}
                        onChange={(e) => onEditCandidate?.(candidate.id, 'front', e.target.value)}
                        onFocus={() => setEditingField({ candidateId: candidate.id, field: 'front' })}
                        onBlur={() => setEditingField(null)}
                        disabled={isRejected}
                        className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                          isRejected ? 'line-through' : ''
                        }`}
                      />
                    </div>

                    {/* Back (English) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        English
                      </label>
                      <input
                        type="text"
                        value={candidate.back}
                        onChange={(e) => onEditCandidate?.(candidate.id, 'back', e.target.value)}
                        onFocus={() => setEditingField({ candidateId: candidate.id, field: 'back' })}
                        onBlur={() => setEditingField(null)}
                        disabled={isRejected}
                        className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                          isRejected ? 'line-through' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Accept/Reject actions */}
                  <div className="flex gap-2">
                    {isPending && (
                      <>
                        {/* Pending: Show both buttons */}
                        <button
                          onClick={() => onAcceptCandidate?.(candidate.id)}
                          className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Accept
                        </button>
                        <button
                          onClick={() => onRejectCandidate?.(candidate.id)}
                          className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </>
                    )}

                    {isAccepted && (
                      <>
                        {/* Accepted: Show status + clear button */}
                        <div className="flex-1 py-2.5 px-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium rounded-lg flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Accepted
                        </div>
                        <button
                          onClick={() => onClearCandidate?.(candidate.id)}
                          className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}

                    {isRejected && (
                      <>
                        {/* Rejected: Show status + clear button */}
                        <div className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-medium rounded-lg flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Skipped
                        </div>
                        <button
                          onClick={() => onClearCandidate?.(candidate.id)}
                          className="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state */}
        {candidates.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No cards found
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We couldn't extract any flashcards from this image. Try a clearer photo or add cards manually.
              </p>
            </div>
          </div>
        )}

        {/* Bottom spacer to prevent content from being hidden behind sticky bar */}
        <div className="h-48" />
      </div>

      {/* Sticky bottom action bar */}
      {candidates.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 shadow-2xl z-50">
          <div className="max-w-2xl mx-auto space-y-3">
            {/* Deck picker */}
            <button
              onClick={() => setShowDeckPicker(true)}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-violet-300 dark:hover:border-violet-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Save to:</span>
                {selectedDeck && (
                  <>
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: selectedDeck.color }}
                    />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {selectedDeck.name}
                    </span>
                  </>
                )}
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={!hasAccepted}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-600 text-white font-semibold rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save {acceptedCount} Card{acceptedCount !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}

      {/* Deck picker modal */}
      {showDeckPicker && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[70vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Choose Deck
              </h3>
              <button
                onClick={() => setShowDeckPicker(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-2">
              {decks.map(deck => (
                <button
                  key={deck.id}
                  onClick={() => {
                    onSelectDeck?.(deck.id)
                    setShowDeckPicker(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                    selectedDeckId === deck.id
                      ? 'bg-violet-50 dark:bg-violet-900/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: deck.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {deck.name}
                    </div>
                    {deck.description && (
                      <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {deck.description}
                      </div>
                    )}
                  </div>
                  {selectedDeckId === deck.id && (
                    <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import type { SettingsPageProps } from '@/../product/sections/settings-account/types'

export function SettingsPage({
  user,
  practiceSettings,
  syncSettings,
  exportHistory,
  onUpdateName,
  onUpdateMaxCards,
  onUpdateMaxRetries,
  onGenerateApiKey,
  onCopyApiKey,
  onDisableApiKey,
  onSync,
  onExport
}: SettingsPageProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameValue, setNameValue] = useState(user.name)
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)
  const [generatedApiKey, setGeneratedApiKey] = useState<string | null>(null)

  const handleSaveName = () => {
    if (nameValue.trim()) {
      onUpdateName?.(nameValue.trim())
      setIsEditingName(false)
    }
  }

  const handleGenerateApiKey = () => {
    // Generate a mock API key (in real app, this comes from backend)
    const mockKey = `fls_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setGeneratedApiKey(mockKey)
    setShowApiKeyDialog(true)
    onGenerateApiKey?.()
  }

  const handleCopyApiKey = () => {
    if (generatedApiKey) {
      navigator.clipboard.writeText(generatedApiKey)
      onCopyApiKey?.()
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="relative min-h-screen">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          {/* Account Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Account
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Display Name
              </label>
              {isEditingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                    className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNameValue(user.name)
                      setIsEditingName(false)
                    }}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-slate-900 dark:text-slate-100 font-medium">
                    {user.name}
                  </span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Practice Settings Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Practice Settings
            </h2>
            <div className="space-y-4">
              {/* Max cards per review */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Max Cards Per Session
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateMaxCards?.(Math.max(5, practiceSettings.maxCardsPerReview - 5))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {practiceSettings.maxCardsPerReview}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                      cards
                    </span>
                  </div>
                  <button
                    onClick={() => onUpdateMaxCards?.(Math.min(100, practiceSettings.maxCardsPerReview + 5))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Max retries */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Max Retries Per Card
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateMaxRetries?.(Math.max(1, practiceSettings.maxRetries - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {practiceSettings.maxRetries}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                      times
                    </span>
                  </div>
                  <button
                    onClick={() => onUpdateMaxRetries?.(Math.min(10, practiceSettings.maxRetries + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Sync Settings Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Device Sync
            </h2>
            <div className="space-y-4">
              {/* API Key Status */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    API Key
                  </label>
                  {syncSettings.hasApiKey && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Active
                    </span>
                  )}
                </div>
                {syncSettings.hasApiKey ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyApiKey}
                      className="flex-1 py-2 px-4 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Key
                    </button>
                    <button
                      onClick={onDisableApiKey}
                      className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      Revoke
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerateApiKey}
                    className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Generate API Key
                  </button>
                )}
                {syncSettings.hasApiKey && syncSettings.apiKeyGeneratedAt && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Generated {formatDate(syncSettings.apiKeyGeneratedAt)}
                  </p>
                )}
              </div>

              {/* Sync Button */}
              {syncSettings.hasApiKey && (
                <div>
                  <button
                    onClick={onSync}
                    className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sync Now
                  </button>
                  {syncSettings.lastSyncedAt && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                      Last synced {formatDate(syncSettings.lastSyncedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Data Section */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Data
            </h2>
            <div>
              <button
                onClick={onExport}
                className="w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export All Cards
              </button>
              {exportHistory.lastExportedAt && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Last exported {formatDate(exportHistory.lastExportedAt)} • {exportHistory.exportCount} total exports
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* API Key Dialog */}
      {showApiKeyDialog && generatedApiKey && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Save Your API Key
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  This key will only be shown once. Copy it now and store it safely.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
              <code className="text-sm text-slate-900 dark:text-slate-100 font-mono break-all">
                {generatedApiKey}
              </code>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyApiKey}
                className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowApiKeyDialog(false)}
                className="px-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

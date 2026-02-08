import { useState } from 'react'
import data from '@/../product/sections/settings-account/data.json'
import { SettingsPage } from './components/SettingsPage'
import type { User, PracticeSettings, SyncSettings, ExportHistory } from '@/../product/sections/settings-account/types'

const initialUser = data.user as User
const initialPracticeSettings = data.practiceSettings as PracticeSettings
const initialSyncSettings = data.syncSettings as SyncSettings
const initialExportHistory = data.exportHistory as ExportHistory

export default function SettingsPagePreview() {
  const [user, setUser] = useState(initialUser)
  const [practiceSettings, setPracticeSettings] = useState(initialPracticeSettings)
  const [syncSettings, setSyncSettings] = useState(initialSyncSettings)
  const [exportHistory, setExportHistory] = useState(initialExportHistory)

  return (
    <SettingsPage
      user={user}
      practiceSettings={practiceSettings}
      syncSettings={syncSettings}
      exportHistory={exportHistory}
      onUpdateName={(name) => {
        setUser({ ...user, name })
        console.log('Update name:', name)
      }}
      onUpdateMaxCards={(maxCards) => {
        setPracticeSettings({ ...practiceSettings, maxCardsPerReview: maxCards })
        console.log('Update max cards:', maxCards)
      }}
      onUpdateMaxRetries={(maxRetries) => {
        setPracticeSettings({ ...practiceSettings, maxRetries })
        console.log('Update max retries:', maxRetries)
      }}
      onGenerateApiKey={() => {
        setSyncSettings({
          ...syncSettings,
          hasApiKey: true,
          apiKeyGeneratedAt: new Date().toISOString()
        })
        console.log('Generate API key')
      }}
      onCopyApiKey={() => {
        console.log('Copy API key')
        alert('API key copied to clipboard!')
      }}
      onDisableApiKey={() => {
        setSyncSettings({
          ...syncSettings,
          hasApiKey: false,
          apiKeyGeneratedAt: null
        })
        console.log('Disable API key')
        alert('API key revoked')
      }}
      onSync={() => {
        setSyncSettings({
          ...syncSettings,
          lastSyncedAt: new Date().toISOString(),
          syncStatus: 'success'
        })
        console.log('Sync now')
        alert('Sync complete!')
      }}
      onExport={() => {
        setExportHistory({
          lastExportedAt: new Date().toISOString(),
          exportCount: exportHistory.exportCount + 1
        })
        console.log('Export data')
        alert('Data exported successfully!')
      }}
    />
  )
}

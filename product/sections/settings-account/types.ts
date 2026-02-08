// =============================================================================
// Data Types
// =============================================================================

export interface User {
  id: string
  name: string
  email: string | null
  createdAt: string
}

export interface PracticeSettings {
  /** Maximum number of cards to review in a single session (default 20) */
  maxCardsPerReview: number
  /** Maximum number of times to retry a card rated "Again" in one session */
  maxRetries: number
}

export interface SyncSettings {
  /** Whether an API key has been generated */
  hasApiKey: boolean
  /** When the current API key was generated */
  apiKeyGeneratedAt: string | null
  /** When the last sync occurred */
  lastSyncedAt: string | null
  /** Status of the last sync attempt */
  syncStatus: 'success' | 'error' | 'never'
}

export interface ExportHistory {
  /** When the user last exported their data */
  lastExportedAt: string | null
  /** Total number of exports performed */
  exportCount: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface AccountSectionProps {
  /** Current user account */
  user: User
  /** Called when user updates their display name */
  onUpdateName?: (name: string) => void
}

export interface PracticeSettingsSectionProps {
  /** Current practice settings */
  settings: PracticeSettings
  /** Called when user changes max cards per review */
  onUpdateMaxCards?: (maxCards: number) => void
  /** Called when user changes max retries */
  onUpdateMaxRetries?: (maxRetries: number) => void
}

export interface SyncSettingsSectionProps {
  /** Current sync settings */
  settings: SyncSettings
  /** Called when user generates a new API key */
  onGenerateApiKey?: () => void
  /** Called when user copies the API key to clipboard */
  onCopyApiKey?: () => void
  /** Called when user disables/revokes the current API key */
  onDisableApiKey?: () => void
  /** Called when user manually triggers a sync */
  onSync?: () => void
}

export interface DataSectionProps {
  /** Export history */
  exportHistory: ExportHistory
  /** Called when user exports all their flashcard data */
  onExport?: () => void
}

export interface SettingsPageProps {
  /** Current user account */
  user: User
  /** Current practice settings */
  practiceSettings: PracticeSettings
  /** Current sync settings */
  syncSettings: SyncSettings
  /** Export history */
  exportHistory: ExportHistory
  /** Account section callbacks */
  onUpdateName?: (name: string) => void
  /** Practice settings callbacks */
  onUpdateMaxCards?: (maxCards: number) => void
  onUpdateMaxRetries?: (maxRetries: number) => void
  /** Sync settings callbacks */
  onGenerateApiKey?: () => void
  onCopyApiKey?: () => void
  onDisableApiKey?: () => void
  onSync?: () => void
  /** Data callbacks */
  onExport?: () => void
}

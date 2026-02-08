# Settings & Account Specification

## Overview
Settings & Account provides practice preferences, device sync management via API keys, and basic account details. It serves as the home for configuration that applies globally across the app.

## User Flows
- View and edit account name
- Adjust practice defaults: max cards per review (default 20), max retries per card
- Generate an API key for device sync (shown once, then hidden — copy or save before closing)
- Copy API key to clipboard
- Disable/revoke API key
- Trigger a manual sync between devices
- Export all cards (data export)
- Future: login credentials, password management

## UI Requirements
- Single scrollable settings page grouped into sections (Account, Practice, Sync, Data)
- Account section: display name, editable inline
- Practice section: max cards per review (number input or stepper), max retries (number input or stepper)
- Sync section: API key status (active/none), generate key button, copy key button, disable key button, sync button with last-synced timestamp
- API key shown only once on generation — clear warning to copy/save before dismissing
- Data section: export cards button
- Future placeholder: authentication and password settings
- Clean grouped card layout per section with clear labels

## Configuration
- shell: true

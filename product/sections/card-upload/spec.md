# Card Upload Specification

## Overview
Card Upload is the primary way to add new flashcards to Flashy. Users can upload a notebook photo for OCR extraction or add cards manually. The OCR review screen lets users edit, accept, or reject extracted candidates before saving them to a chosen deck.

## User Flows

### Photo Upload
- Tap "Upload photo" to open file/camera picker
- Photo is sent for OCR + LLM processing (loading state shown)
- Review screen displays all extracted candidates as Spanish + English pairs
- Edit any candidate inline by tapping to fix Spanish or English text
- Accept or reject individual candidates (checkmark/X)
- Multi-select candidates for bulk actions
- Choose target deck at the end (defaults to default deck if not selected)
- Save accepted cards to the chosen deck

### Manual Add
- Tap "Add manually" to open a simple card form
- Enter front (Spanish), back (English), and optional notes
- Pick target deck or leave as default deck
- Save card

## UI Requirements
- Upload hub with clear primary action (photo upload) and secondary action (manual add)
- Processing screen with progress/loading indicator
- OCR review screen: each candidate as an editable row showing Spanish and English text
- Accept/reject controls per candidate
- Multi-select mode with bulk action bar at bottom
- Deck picker at the bottom of the review screen (sticky or at save step)
- Rejected candidates visually dimmed or struck through before final discard
- Empty state if OCR extracts nothing useful
- Design for single photo upload now; review screen pattern should scale to longer candidate lists for future multi-photo support

## Configuration
- shell: true

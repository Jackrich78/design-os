import data from '@/../product/sections/practice-session/data.json'
import { PracticeSummary } from './components/PracticeSummary'

export default function PracticeSummaryPreview() {
  return (
    <PracticeSummary
      summary={data.sessionSummary}
      onDone={() => console.log('Done - return to app')}
      onRetryProblemCards={() => console.log('Retry problem cards')}
    />
  )
}

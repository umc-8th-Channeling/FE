import { memo } from 'react'
import { Evaluation } from '../overview/Evaluation'
import { Summary } from '../overview/Summary'
import { DummyCommentFeedback } from './DummyCommentFeedback'

const EvaluationAndSummary = memo(() => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation />
            <Summary />
        </div>
    )
})

export const DummyTabOverview = () => {
    return (
        <div className="space-y-16">
            <EvaluationAndSummary />
            <DummyCommentFeedback />
        </div>
    )
}

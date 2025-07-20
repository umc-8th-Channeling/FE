import { memo } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { Skeleton } from './Skeleton'

const EvaluationAndSummary = memo(() => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation />
            <Summary />
        </div>
    )
})

export const TabOverview = () => {
    const isLoading = false // ✅ 임시

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <EvaluationAndSummary />
            <CommentFeedback />
        </div>
    )
}

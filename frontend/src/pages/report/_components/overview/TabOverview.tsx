import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'

export const TabOverview = () => {
    return (
        <div className="space-y-16">
            <div className="flex flex-row gap-6">
                <Evaluation />
                <Summary />
            </div>
            <CommentFeedback />
        </div>
    )
}

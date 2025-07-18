import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'

export const TabOverview = () => {
    return (
        <div className="space-y-16">
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
                <Evaluation />
                <Summary />
            </div>
            <CommentFeedback />
        </div>
    )
}

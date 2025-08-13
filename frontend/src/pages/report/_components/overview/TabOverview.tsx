import { memo, useEffect, useState } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { Skeleton } from './Skeleton'
import { usePoolReportStatus } from '../../../../hooks/report/usePollReportStatus'

const EvaluationAndSummary = memo(() => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation />
            <Summary />
        </div>
    )
})

export const TabOverview = ({ reportId }: { reportId: number }) => {
    const [isLoading, setIsLoading] = useState(true)
    const { data: statusData } = usePoolReportStatus(reportId ?? undefined)

    useEffect(() => {
        const reportStatus = statusData?.result

        if (reportStatus) {
            if (reportStatus.overviewStatus === 'COMPLETED') {
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        }
    }, [statusData])

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <EvaluationAndSummary />
            <CommentFeedback />
        </div>
    )
}

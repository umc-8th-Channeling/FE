import { memo } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { Skeleton } from './Skeleton'
import { usePoolReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportOverview from '../../../../hooks/report/useGetReportOverview'
import type { OverviewDataProps } from '../../../../types/report/all'

const EvaluationAndSummary = memo(({ data }: OverviewDataProps) => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation data={data} />
            <Summary data={data} />
        </div>
    )
})

export const TabOverview = ({ reportId }: { reportId: number }) => {
    const { data: statusData } = usePoolReportStatus(reportId ?? undefined)

    const isCompleted = statusData?.result?.overviewStatus === 'COMPLETED'

    const { data: overviewData, isLoading: isOverviewLoading } = useGetReportOverview({
        reportId,
        enabled: isCompleted,
    })

    const isLoading = !isCompleted || isOverviewLoading || !overviewData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <EvaluationAndSummary data={overviewData} />
            <CommentFeedback data={overviewData} />
        </div>
    )
}

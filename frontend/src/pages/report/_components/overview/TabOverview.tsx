import { memo, useEffect } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportOverview from '../../../../hooks/report/useGetReportOverview'
import type { OverviewDataProps } from '../../../../types/report/all'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'
import { useAuthStore } from '../../../../stores/authStore'
import { useReportStore } from '../../../../stores/reportStore'

const EvaluationAndSummary = memo(({ data }: OverviewDataProps) => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation data={data} />
            <Summary data={data} />
        </div>
    )
})

export const TabOverview = ({ reportId, isFromLibrary = false }: { reportId: number; isFromLibrary?: boolean }) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary,
    })

    const status = statusData?.result?.overviewStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: overviewData, isLoading: isOverviewLoading } = useGetReportOverview({
        reportId,
        enabled: isCompleted,
    })

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: deleteReport } = useDeleteMyReport({ channelId })

    const setIsErrorTrue = useReportStore((state) => state.actions.setIsErrorTrue)

    useEffect(() => {
        if (isFailed) {
            setIsErrorTrue()
            deleteReport({ reportId })
        }
    }, [isFailed, setIsErrorTrue, reportId, deleteReport])

    const isLoading = !isCompleted || isOverviewLoading || !overviewData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <EvaluationAndSummary data={overviewData} />
            <CommentFeedback data={overviewData} />
        </div>
    )
}

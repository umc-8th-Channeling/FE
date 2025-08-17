import { memo, useEffect } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportOverview from '../../../../hooks/report/useGetReportOverview'
import { useGetDummyOverview } from '../../../../hooks/report/useGetDummyReport'
import type { OverviewDataProps } from '../../../../types/report/all'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'
import { useAuthStore } from '../../../../stores/authStore'
import { useReportStore } from '../../../../stores/reportStore'

interface TabOverviewProps {
    reportId: number
    isFromLibrary?: boolean
    isDummy?: boolean
}

export const TabOverview = ({ reportId, isFromLibrary = false, isDummy = false }: TabOverviewProps) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary && !isDummy, // isDummy 일 때는 풀링 하지 않음
    })

    // isDummy일 경우 항상 'COMPLETED'
    const status = isDummy ? 'COMPLETED' : statusData?.result?.overviewStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: realData, isLoading: isRealLoading } = useGetReportOverview({
        reportId,
        enabled: isCompleted && !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyOverview({
        reportId,
        enabled: isDummy,
    })

    const overviewData = isDummy ? dummyData : realData
    const isLoading = isDummy ? isDummyLoading : !isCompleted || isRealLoading

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

    if (isLoading || !overviewData) return <Skeleton />

    return (
        <div className="space-y-16">
            <EvaluationAndSummary data={overviewData} />
            <CommentFeedback data={overviewData} isDummy={isDummy} />
        </div>
    )
}

const EvaluationAndSummary = memo(({ data }: OverviewDataProps) => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation data={data} />
            <Summary data={data} />
        </div>
    )
})

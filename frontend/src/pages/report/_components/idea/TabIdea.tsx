import { useEffect } from 'react'
import { TrendKeywords } from './TrendKeywords'
import { ContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportIdea from '../../../../hooks/report/useGetReportIdea'
import { useAuthStore } from '../../../../stores/authStore'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'
import { useReportStore } from '../../../../stores/reportStore'

export const TabIdea = ({ reportId, isFromLibrary = false }: { reportId: number; isFromLibrary?: boolean }) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary,
    })

    const status = statusData?.result?.ideaStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: ideaData, isLoading: isIdeaLoading } = useGetReportIdea({
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

    const isLoading = !isCompleted || isIdeaLoading || !ideaData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords data={ideaData} />
            <ContentsIdea data={ideaData} />
        </div>
    )
}

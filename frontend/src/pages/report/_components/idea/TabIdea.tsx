import { useEffect } from 'react'
import { TrendKeywords } from './TrendKeywords'
import { ContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportIdea from '../../../../hooks/report/useGetReportIdea'
import { useAuthStore } from '../../../../stores/authStore'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'
import { useReportStore } from '../../../../stores/reportStore'
import { useGetDummyIdea } from '../../../../hooks/report/useGetDummyReport'

interface TabIdeaProps {
    reportId: number
    isFromLibrary?: boolean
    isDummy?: boolean
}

export const TabIdea = ({ reportId, isFromLibrary = false, isDummy = false }: TabIdeaProps) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary && !isDummy, // isDummy 일 때는 풀링 하지 않음
    })

    // isDummy일 경우 항상 'COMPLETED'
    const status = isDummy ? 'COMPLETED' : statusData?.result?.ideaStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: realData, isLoading: isRealLoading } = useGetReportIdea({
        reportId,
        enabled: isCompleted && !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyIdea({
        reportId,
        enabled: isDummy,
    })

    const ideaData = isDummy ? dummyData : realData
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

    if (isLoading || !ideaData) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords data={ideaData} />
            <ContentsIdea data={ideaData} isDummy={isDummy} />
        </div>
    )
}

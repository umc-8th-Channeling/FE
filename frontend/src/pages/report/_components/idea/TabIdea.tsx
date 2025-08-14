import { TrendKeywords } from './TrendKeywords'
import { ContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportIdea from '../../../../hooks/report/useGetReportIdea'

export const TabIdea = ({ reportId }: { reportId: number }) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined)

    const isCompleted = statusData?.result?.ideaStatus === 'COMPLETED'

    const { data: ideaData, isLoading: isIdeaLoading } = useGetReportIdea({
        reportId,
        enabled: isCompleted,
    })

    const isLoading = !isCompleted || isIdeaLoading || !ideaData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords data={ideaData} />
            <ContentsIdea data={ideaData} />
        </div>
    )
}

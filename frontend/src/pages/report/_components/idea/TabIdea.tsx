import { TrendKeywords } from './TrendKeywords'
import { ContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'
import useGetReportIdea from '../../../../hooks/report/useGetReportIdea'
import { useReportStore } from '../../../../stores/reportStore'
import { useGetDummyIdea } from '../../../../hooks/report/useGetDummyReport'

interface TabIdeaProps {
    reportId: number
    isDummy?: boolean
}

export const TabIdea = ({ reportId, isDummy = false }: TabIdeaProps) => {
    const ideaStatus = useReportStore((state) => state.statuses[reportId]?.ideaStatus)
    const isCompleted = ideaStatus === 'COMPLETED'

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

    if (isLoading || !ideaData) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords data={ideaData} />
            <ContentsIdea data={ideaData} isDummy={isDummy} />
        </div>
    )
}

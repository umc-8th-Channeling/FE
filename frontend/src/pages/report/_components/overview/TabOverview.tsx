import { memo, useEffect, useState } from 'react'
import { CommentFeedback } from './CommentFeedback'
import { Evaluation } from './Evaluation'
import { Summary } from './Summary'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportOverview from '../../../../hooks/report/useGetReportOverview'
import type { OverviewDataProps } from '../../../../types/report/all'
import { GenerateErrorModal } from '../GenerateErrorModal'
import { useNavigate } from 'react-router-dom'

const EvaluationAndSummary = memo(({ data }: OverviewDataProps) => {
    return (
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-16 desktop:gap-6">
            <Evaluation data={data} />
            <Summary data={data} />
        </div>
    )
})

export const TabOverview = ({ reportId, isFromLibrary = false }: { reportId: number; isFromLibrary?: boolean }) => {
    const navigate = useNavigate()

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
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

    useEffect(() => {
        if (isFailed) {
            setIsErrorModalOpen(true)
        }
    }, [isFailed])

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false)
        navigate('/')
    }

    const isLoading = !isCompleted || isOverviewLoading || !overviewData

    if (isLoading)
        return (
            <>
                <Skeleton />
                {isErrorModalOpen && <GenerateErrorModal onClose={handleCloseErrorModal} />}
            </>
        )

    return (
        <div className="space-y-16">
            <EvaluationAndSummary data={overviewData} />
            <CommentFeedback data={overviewData} />
        </div>
    )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendKeywords } from './TrendKeywords'
import { ContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportIdea from '../../../../hooks/report/useGetReportIdea'
import { GenerateErrorModal } from '../GenerateErrorModal'

export const TabIdea = ({ reportId }: { reportId: number }) => {
    const navigate = useNavigate()

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const { data: statusData } = usePollReportStatus(reportId ?? undefined)

    const status = statusData?.result?.ideaStatus
    const isCompleted = status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: ideaData, isLoading: isIdeaLoading } = useGetReportIdea({
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

    const isLoading = !isCompleted || isIdeaLoading || !ideaData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords data={ideaData} />
            <ContentsIdea data={ideaData} />

            {isErrorModalOpen && <GenerateErrorModal onClose={handleCloseErrorModal} />}
        </div>
    )
}

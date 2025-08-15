import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { GenerateErrorModal } from '../GenerateErrorModal'

export const TabAnalysis = ({ reportId }: { reportId: number }) => {
    const navigate = useNavigate()

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const { data: statusData } = usePollReportStatus(reportId ?? undefined)

    const status = statusData?.result?.analysisStatus
    const isCompleted = status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: analysisData, isLoading: isAnalysisLoading } = useGetReportAnalysis({
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

    const isLoading = !isCompleted || isAnalysisLoading || !analysisData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />

            {isErrorModalOpen && <GenerateErrorModal onClose={handleCloseErrorModal} />}
        </div>
    )
}

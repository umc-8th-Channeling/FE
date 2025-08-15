import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { GenerateErrorModal } from '../GenerateErrorModal'
import { useAuthStore } from '../../../../stores/authStore'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'

export const TabAnalysis = ({ reportId, isFromLibrary = false }: { reportId: number; isFromLibrary?: boolean }) => {
    const navigate = useNavigate()

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary,
    })

    const status = statusData?.result?.analysisStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: analysisData, isLoading: isAnalysisLoading } = useGetReportAnalysis({
        reportId,
        enabled: isCompleted,
    })

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: deleteReport } = useDeleteMyReport({ channelId })

    useEffect(() => {
        if (isFailed) {
            setIsErrorModalOpen(true)
            deleteReport({ reportId })
        }
    }, [isFailed, reportId, deleteReport])

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false)
        navigate('/')
    }

    const isLoading = !isCompleted || isAnalysisLoading || !analysisData

    if (isLoading)
        return (
            <>
                <Skeleton />
                {isErrorModalOpen && <GenerateErrorModal onClose={handleCloseErrorModal} />}
            </>
        )

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}

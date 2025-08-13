import { useEffect, useState } from 'react'
import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import { usePoolReportStatus } from '../../../../hooks/report/usePollReportStatus'

export const TabAnalysis = ({ reportId }: { reportId: number }) => {
    const [isLoading, setIsLoading] = useState(true)
    const { data: statusData } = usePoolReportStatus(reportId ?? undefined)

    useEffect(() => {
        const reportStatus = statusData?.result

        if (reportStatus) {
            if (reportStatus.analysisStatus === 'COMPLETED') {
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        }
    }, [statusData])

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis />
            <AlgorithmOptimization />
        </div>
    )
}

import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'

export const TabAnalysis = () => {
    const isLoading = false // ✅ 임시

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis />
            <AlgorithmOptimization />
        </div>
    )
}

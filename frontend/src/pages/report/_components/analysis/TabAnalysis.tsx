import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'

export const TabAnalysis = () => {
    return (
        <div className="space-y-16">
            <ViewerExitAnalysis />
            <AlgorithmOptimization />
        </div>
    )
}

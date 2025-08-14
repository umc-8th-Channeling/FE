import { AlgorithmOptimization } from '../analysis/AlgorithmOptimization'
import { ViewerExitAnalysis } from '../analysis/ViewerExitAnalysis'

export const DummyTabAnalysis = () => {
    return (
        <div className="space-y-16">
            <ViewerExitAnalysis />
            <AlgorithmOptimization />
        </div>
    )
}

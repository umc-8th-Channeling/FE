import { TitledSection } from '../TitledSection'
import type { AnalysisDataProps } from '../../../../types/report/all'
import { MarkdownBox } from '../../../../components/MarkdownBox'

export const ViewerExitAnalysis = ({ data }: AnalysisDataProps) => {
    const markdownText = data.leaveAnalyze.replace(/\\n/g, '\n')

    const [firstLine, ...restLines] = markdownText.split('\n\n')
    const restText = restLines.join('\n\n')

    return (
        <TitledSection title="시청자 이탈 분석">
            <div
                className="
                    w-full rounded-lg border border-gray-200
                    bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden
                "
            >
                <div className="flex flex-col space-y-4 font-body-16r">
                    <p className="text-primary-600 font-body-16m">{firstLine}</p>
                    <MarkdownBox content={restText} />
                </div>
            </div>
        </TitledSection>
    )
}

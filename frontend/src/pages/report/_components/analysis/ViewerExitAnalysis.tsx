import Markdown from 'react-markdown'
import { TitledSection } from '../TitledSection'
import { EXIT_ANALYSIS, EXIT_ANALYSIS_HIGHLIGHT } from '../../dummy'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export const ViewerExitAnalysis = () => {
    return (
        <TitledSection title="시청자 이탈 분석">
            <div
                className="w-full rounded-lg border border-gray-200
            bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden"
            >
                <div className="flex flex-col space-y-4 font-body-16r">
                    <p className="text-primary-600 font-body-16m">{EXIT_ANALYSIS_HIGHLIGHT}</p>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h3: ({ children }) => <h3 className="mt-4 mb-2 font-body-16b">{children}</h3>,
                            p: ({ children }) => <p className="pl-1 font-body-16r">{children}</p>,
                            ul: ({ children }) => <ul className="pl-1 font-body-16r">{children}</ul>,
                            li: ({ children }) => <li className="pl-1 font-body-16r">{children}</li>,
                        }}
                    >
                        {EXIT_ANALYSIS}
                    </Markdown>
                </div>
            </div>
        </TitledSection>
    )
}

import Markdown from 'react-markdown'
import { TitledSection } from '../TitledSection'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { AnalysisDataProps } from '../../../../types/report/all'

export const ViewerExitAnalysis = ({ data }: AnalysisDataProps) => {
    const markdownText = data.leaveAnalyze.replace(/\\n/g, '\n')

    const [firstLine, ...restLines] = markdownText.split('\n\n')
    const restText = restLines.join('\n\n')

    return (
        <TitledSection title="시청자 이탈 분석">
            <div
                className="w-full rounded-lg border border-gray-200
            bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden"
            >
                <div className="flex flex-col space-y-4 font-body-16r">
                    <p className="text-primary-600 font-body-16m">{firstLine}</p>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="first:mt-0 mt-4 mb-2 text-[18px] leading-[150%] font-bold tracking-[-0.4px] tablet:text-[20px]">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="first:mt-0 mt-4 mb-2 text-[16px] leading-[150%] font-bold tracking-[-0.4px] tablet:text-[18px]">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="first:mt-0 mt-4 mb-2 text-[16px] leading-[150%] font-bold tracking-[-0.4px]">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => <p className="font-body-16r">{children}</p>,
                            ul: ({ children }) => <ul className="font-body-16r">{children}</ul>,
                            li: ({ children }) => (
                                <li className="relative pl-6 before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-current before:rounded-full font-body-16r">
                                    {children}
                                </li>
                            ),
                        }}
                    >
                        {restText}
                    </Markdown>
                </div>
            </div>
        </TitledSection>
    )
}

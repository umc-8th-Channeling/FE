import { useRef } from 'react'
import Markdown from 'react-markdown'
import { TitledSection } from '../TitledSection'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ALGORITHM_CONTENT } from '../../dummy'

export const AlgorithmOptimization = () => {
    const firstHeadingRendered = useRef(false)

    return (
        <TitledSection title="알고리즘 최적화">
            <div
                className="w-full rounded-lg border border-gray-200
                bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden"
            >
                <div className="flex flex-col space-y-4 font-body-regular tracking-[-0.4px]">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h3: ({ children }) => {
                                const className = firstHeadingRendered.current
                                    ? 'mt-4 mb-2 font-body-bold tracking-[-0.4px]'
                                    : 'mb-2 font-body-bold tracking-[-0.4px]'

                                firstHeadingRendered.current = true
                                return <h3 className={className}>{children}</h3>
                            },
                            p: ({ children }) => <p className="pl-1 font-body-regular tracking-[-0.4px]">{children}</p>,
                            ul: ({ children }) => (
                                <ul className="pl-1 font-body-regular tracking-[-0.4px]">{children}</ul>
                            ),
                            li: ({ children }) => (
                                <li className="pl-1 font-body-regular tracking-[-0.4px]">{children}</li>
                            ),
                        }}
                    >
                        {ALGORITHM_CONTENT}
                    </Markdown>
                </div>
            </div>
        </TitledSection>
    )
}

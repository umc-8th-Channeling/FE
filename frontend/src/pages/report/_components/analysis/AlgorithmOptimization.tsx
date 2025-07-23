import Markdown from 'react-markdown'
import { TitledSection } from '../TitledSection'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ALGORITHM_CONTENT } from '../../dummy'

export const AlgorithmOptimization = () => {
    return (
        <TitledSection title="알고리즘 최적화">
            <div
                className="w-full rounded-lg border border-gray-200
                            bg-surface-elevate-l1 p-6 overflow-y-auto overflow-hidden"
            >
                <div className="flex flex-col space-y-4 font-body-regular">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h3: ({ children }) => <h3 className="first:mt-0 mt-4 mb-2 font-body-bold">{children}</h3>,
                            p: ({ children }) => <p className="pl-1 font-body-regular">{children}</p>,
                            ul: ({ children }) => <ul className="pl-1 font-body-regular">{children}</ul>,
                            li: ({ children }) => <li className="pl-1 font-body-regular">{children}</li>,
                        }}
                    >
                        {ALGORITHM_CONTENT}
                    </Markdown>
                </div>
            </div>
        </TitledSection>
    )
}

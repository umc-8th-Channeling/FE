import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface MarkdownBoxProps {
    content: string
}

export const MarkdownBox = ({ content }: MarkdownBoxProps) => {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                // 텍스트 관련
                h1: ({ children }) => <h1 className="first:mt-0 mt-4 mb-2 font-title-20b">{children}</h1>,
                h2: ({ children }) => <h2 className="first:mt-0 mt-4 mb-2 font-title-20b">{children}</h2>,
                h3: ({ children }) => <h3 className="first:mt-0 mt-4 mb-2 font-title-18b">{children}</h3>,
                p: ({ children }) => <p className="font-body-16r">{children}</p>,

                // ul/li
                ul: ({ children }) => (
                    <ul className="font-body-16r list-disc list-outside pl-5 my-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="font-body-16r list-decimal list-outside pl-5 my-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => <li className="font-body-16r">{children}</li>,

                // 코드 블럭
                pre: ({ children }) => (
                    <pre
                        className="
                            bg-gray-200 p-4 rounded-lg my-4 overflow-x-auto
                            [&::-webkit-scrollbar]:h-2
                            [&::-webkit-scrollbar-button:single-button:increment]:hidden
                            [&::-webkit-scrollbar-button:single-button:decrement]:hidden
                        "
                    >
                        {children}
                    </pre>
                ),
                code: ({ children, ...props }) => {
                    return (
                        <code className="text-[14px]" {...props}>
                            {children}
                        </code>
                    )
                },

                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                hr: () => <hr className="my-6 border-gray-300" />,
                a: ({ ...props }) => <a className="text-primary-600 hover:underline" {...props} />,
            }}
        >
            {content}
        </Markdown>
    )
}

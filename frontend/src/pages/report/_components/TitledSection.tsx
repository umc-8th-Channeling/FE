import type { PropsWithChildren } from 'react'

interface TitledSectionProps {
    title: string
    className?: string
}

export const TitledSection = ({ title, children }: PropsWithChildren<TitledSectionProps>) => {
    return (
        <section className="w-full space-y-4">
            <h1
                className="
                    whitespace-nowrap text-start 
                    font-title-20b
                "
            >
                {title}
            </h1>
            <div>{children}</div>
        </section>
    )
}

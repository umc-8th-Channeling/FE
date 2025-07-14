import type { PropsWithChildren } from 'react'

interface TitledSectionProps {
    title: string
    className?: string
}

export const TitledSection = ({ title, children }: PropsWithChildren<TitledSectionProps>) => {
    return (
        <section className="w-full space-y-4">
            <h1 className="whitespace-nowrap text-start text-[20px] font-bold leading-[140%] tracking-[-0.5px]">
                {title}
            </h1>
            <div>{children}</div>
        </section>
    )
}

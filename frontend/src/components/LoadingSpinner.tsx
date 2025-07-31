import Spinner from '../assets/loading/spinner.svg?react'
import { useReportStore } from '../stores/reportStore'

interface LoadingSpinnerProps {
    title?: string
    description?: string
}

const LoadingSpinner = ({ title, description }: LoadingSpinnerProps) => {
    const isReportGenerating = useReportStore((state) => state.isReportGenerating)

    if (!isReportGenerating) return

    return (
        <div className="fixed inset-0 h-screen z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-black-opacity50 backdrop-blur-sm" />

            <div className="relative flex flex-col justify-center items-center text-center gap-6">
                <Spinner className="animate-spin" />
                <div className="space-y-2">
                    {title && <h3 className="text-[20px] font-bold leading-[140%] tracking-[-0.5px]">{title}</h3>}
                    {description && <p className="text-[16px] leading-[150%] tracking-[-0.4px]">{description}</p>}
                </div>
            </div>
        </div>
    )
}

export default LoadingSpinner

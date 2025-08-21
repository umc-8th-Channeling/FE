import Spinner from '../assets/loading/spinner.svg?react'

interface LoadingSpinnerProps {
    title?: string
    description?: string
    isLoading: boolean
}

const LoadingSpinner = ({ title, description, isLoading }: LoadingSpinnerProps) => {
    if (!isLoading) return

    return (
        <div className="fixed inset-0 h-screen z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-black-opacity50 backdrop-blur-sm" />

            <div className="relative flex flex-col justify-center items-center text-center gap-6">
                <Spinner className="animate-spin" />
                <div className="space-y-2">
                    {title && <h3 className="font-title-20b">{title}</h3>}
                    {description && <p className="font-body-16r">{description}</p>}
                </div>
            </div>
        </div>
    )
}

export default LoadingSpinner

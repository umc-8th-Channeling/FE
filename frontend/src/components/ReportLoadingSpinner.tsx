import Spinner from '../assets/loading/spinner.svg?react'
import { useReportStore } from '../stores/reportStore'

const ReportLoadingSpinner = () => {
    const isReportGenerating = useReportStore((state) => state.isReportGenerating)

    if (!isReportGenerating) return

    return (
        <div className="fixed inset-0 h-screen z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-black-opacity50 backdrop-blur-sm" />

            <div className="relative flex flex-col justify-center items-center text-center gap-6">
                <Spinner className="animate-spin" />
                <div className="space-y-2">
                    <h3 className="text-[20px] font-bold leading-[140%] tracking-[-0.5px]">영상 분석 중...</h3>
                    <p className="text-[16px] leading-[150%] tracking-[-0.4px]">
                        조금만 기다려 주세요. 곧 결과가 나와요!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReportLoadingSpinner

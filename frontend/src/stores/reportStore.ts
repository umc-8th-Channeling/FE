import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ReportActions {
    startGenerating: () => void
    endGenerating: () => void
    setIsErrorTrue: () => void
    setIsErrorFalse: () => void
}

interface ReportState {
    isReportGenerating: boolean
    isError: boolean
    actions: ReportActions
}

export const useReportStore = create<ReportState>()(
    devtools((set) => ({
        isReportGenerating: false,
        isError: false,
        actions: {
            startGenerating: () => set({ isReportGenerating: true }),
            endGenerating: () => set({ isReportGenerating: false }),
            setIsErrorTrue: () => set({ isError: true }),
            setIsErrorFalse: () => set({ isError: false }),
        },
    }))
)

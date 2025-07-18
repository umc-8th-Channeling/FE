import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ReportActions {
    startGenerating: () => void
    endGenerating: () => void
}

interface ReportState {
    isReportGenerating: boolean
    actions: ReportActions
}

export const useReportStore = create<ReportState>()(
    devtools((set) => ({
        isReportGenerating: false,
        actions: {
            startGenerating: () => set({ isReportGenerating: true }),
            endGenerating: () => set({ isReportGenerating: false }),
        },
    }))
)

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface LoginState {
    showLoginModal: boolean
    showViewerModal: boolean
    showChannelConceptModal: boolean
    viewerValue: string
    channelConceptValue: string

    actions: {
        openLoginModal: () => void
        closeLoginModal: () => void
        startLogin: () => void

        openViewerModal: () => void
        closeViewerModal: () => void
        setViewerValue: (value: string) => void

        openChannelConceptModal: () => void
        closeChannelConceptModal: () => void
        setChannelConceptValue: (value: string) => void
    }
}

export const useLoginStore = create<LoginState>()(
    devtools((set) => ({
        showLoginModal: false,
        showViewerModal: false,
        showChannelConceptModal: false,
        viewerValue: '',
        channelConceptValue: '',

        actions: {
            openLoginModal: () => set({ showLoginModal: true }),
            closeLoginModal: () => set({ showLoginModal: false }),
            startLogin: () => set({ showLoginModal: true }),

            openViewerModal: () => set({ showViewerModal: true }),
            closeViewerModal: () => set({ showViewerModal: false }),
            setViewerValue: (value: string) => set({ viewerValue: value }),

            openChannelConceptModal: () => set({ showChannelConceptModal: true }),
            closeChannelConceptModal: () => set({ showChannelConceptModal: false }),
            setChannelConceptValue: (value: string) => set({ channelConceptValue: value }),
        },
    }))
)

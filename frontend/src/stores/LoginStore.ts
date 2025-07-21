import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface LoginState {
    showLoginModal: boolean
    showViewerModal: boolean
    showChannelConceptModal: boolean
    viewerValue: string
    channelConceptValue: string

    isLoginFlowOpen: () => boolean

    actions: {
        openLoginModal: () => void
        closeLoginModal: () => void
        startLogin: () => void
        endLogin: () => void

        openViewerModal: () => void
        closeViewerModal: () => void
        setViewerValue: (value: string) => void

        openChannelConceptModal: () => void
        closeChannelConceptModal: () => void
        setChannelConceptValue: (value: string) => void
    }
}

export const useLoginStore = create<LoginState>()(
    devtools((set, get) => ({
        showLoginModal: false,
        showViewerModal: false,
        showChannelConceptModal: false,
        viewerValue: '',
        channelConceptValue: '',

        isLoginFlowOpen: () => {
            const state = get()
            return state.showLoginModal || state.showViewerModal || state.showChannelConceptModal
        },

        actions: {
            openLoginModal: () => set({ showLoginModal: true }),
            closeLoginModal: () => set({ showLoginModal: false }),
            startLogin: () => set({ showLoginModal: true }),
            endLogin: () =>
                set({
                    showLoginModal: false,
                    showViewerModal: false,
                    showChannelConceptModal: false,
                    viewerValue: '',
                    channelConceptValue: '',
                }),

            openViewerModal: () => set({ showViewerModal: true }),
            closeViewerModal: () => set({ showViewerModal: false }),
            setViewerValue: (value: string) => set({ viewerValue: value }),

            openChannelConceptModal: () => set({ showChannelConceptModal: true }),
            closeChannelConceptModal: () => set({ showChannelConceptModal: false }),
            setChannelConceptValue: (value: string) => set({ channelConceptValue: value }),
        },
    }))
)

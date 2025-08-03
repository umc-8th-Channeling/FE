import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface User {
    channelId: number
    nickname?: string
    googleEmail?: string
    profileImage?: string | null
    instagramLink?: string
    tiktokLink?: string
    facebookLink?: string
    googleId?: string
    createdAt?: string
    updatedAt?: string
}

interface AuthActions {
    setUser: (user: User | null) => void
    setAuthGuest: () => void
    setAuthMember: () => void
    setProfileImage: (url: string | null) => void
}

interface AuthState {
    user: User | null
    isAuth: boolean
    actions: AuthActions
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        isAuth: false,
        actions: {
            setUser: (user) => set({ user }),
            setAuthGuest: () => set({ isAuth: false }),
            setAuthMember: () => set({ isAuth: true }),
            setProfileImage: (url) =>
                set((state) => (state.user ? { user: { ...state.user, profileImage: url } } : state)),
        },
    }))
)

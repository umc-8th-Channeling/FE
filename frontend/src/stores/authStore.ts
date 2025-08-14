import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from '../types/channel'

interface AuthActions {
    setUser: (user: User) => void
    setAuthGuest: () => void
    setAuthMember: () => void
    setChannelId: (channelId: number) => void
    setProfileImage: (url: string | null) => void
    clearAuth: () => void
}

interface AuthState {
    channelId: number | null
    user: User | null
    isAuth: boolean
    actions: AuthActions
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                channelId: null,
                user: null,
                isAuth: false,
                actions: {
                    setUser: (user) => set({ user }),
                    setAuthGuest: () => set({ isAuth: false }),
                    setAuthMember: () => set({ isAuth: true }),
                    setChannelId: (channelId) => set({ channelId }),
                    setProfileImage: (url) =>
                        set(
                            (state): Partial<AuthState> => ({
                                user: state.user ? { ...state.user, profileImage: url } : null,
                            })
                        ),
                    clearAuth: () =>
                        set({
                            channelId: null,
                            user: null,
                            isAuth: false,
                        }),
                },
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    user: state.user,
                    isAuth: state.isAuth,
                }),
            }
        )
    )
)

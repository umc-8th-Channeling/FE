import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from '../types/auth'

interface AuthActions {
    setUser: (user: User) => void
    setAuthGuest: () => void
    setAuthMember: () => void
}

interface AuthState {
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

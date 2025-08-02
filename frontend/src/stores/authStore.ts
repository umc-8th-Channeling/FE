import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface User {
    channelId: number
    name?: string
    email?: string
}

interface AuthActions {
    setUser: (user: User) => void // 유저 정보 타입을 만들어서 수정 가능성
    setAuthGuest: () => void
    setAuthMember: () => void
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
        },
    }))
)

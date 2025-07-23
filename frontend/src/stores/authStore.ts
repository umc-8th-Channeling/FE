import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthActions {
    setUser: (user: string) => void // 유저 정보 타입을 만들어서 수정 가능성
    setAuthGuest: () => void
    setAuthMember: () => void
}

interface AuthState {
    user: string | null
    isAuth: boolean
    actions: AuthActions
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        isAuth: false,
        actions: {
            setUser: (user: string) => set({ user }),
            setAuthGuest: () => set({ isAuth: false }),
            setAuthMember: () => set({ isAuth: true }),
        },
    }))
)

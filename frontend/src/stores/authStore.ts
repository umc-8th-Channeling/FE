import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface User {
    memberId: number
    nickname: string
    googleEmail: string
    profileImage: string
    instagramLink: string | null
    tiktokLink: string | null
    facebookLink: string | null
    twitterLink: string | null
}

interface AuthActions {
    setUser: (user: User) => void // 유저 정보 타입을 만들어서 수정 가능성
    setAuthGuest: () => void
    setAuthMember: () => void
    setChannelId: (channelId: number) => void
}

interface AuthState {
    channelId: number | null
    user: User | null
    isAuth: boolean
    actions: AuthActions
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        channelId: null,
        user: null,
        isAuth: false,
        actions: {
            setChannelId: (channelId) => set({ channelId }),
            setUser: (user) => set({ user }),
            setAuthGuest: () => set({ isAuth: false }),
            setAuthMember: () => set({ isAuth: true }),
        },
    }))
)

import { create } from 'zustand'

interface Member {
    id: number
    memberId: number
    profileImage?: string
}

interface MemberState {
    member: Member | null
    setMember: (member: Member) => void
    clearMember: () => void
}

export const useMemberStore = create<MemberState>((set) => ({
    member: null,
    setMember: (member) => set({ member }),
    clearMember: () => set({ member: null }),
}))

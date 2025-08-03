import { create } from 'zustand'

type ProfileImageState = {
    profileImageUrl: string | null
    setProfileImageUrl: (url: string | null) => void
    resetProfileImageUrl: () => void
}

export const useProfileImageStore = create<ProfileImageState>((set) => ({
    profileImageUrl: null,
    setProfileImageUrl: (url) => set({ profileImageUrl: url }),
    resetProfileImageUrl: () => set({ profileImageUrl: null }),
}))

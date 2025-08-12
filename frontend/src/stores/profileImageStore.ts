import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ProfileImageState = {
    profileImageUrl: string | null
    setProfileImageUrl: (url: string | null) => void
    resetProfileImageUrl: () => void
}

export const useProfileImageStore = create(
    persist<ProfileImageState>(
        (set) => ({
            profileImageUrl: null,
            setProfileImageUrl: (url) => set({ profileImageUrl: url }),
            resetProfileImageUrl: () => set({ profileImageUrl: null }),
        }),
        {
            name: 'profile-image-storage',
        }
    )
)

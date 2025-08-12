import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SNSKey = 'instagram' | 'tiktok' | 'facebook' | 'x'

type SNSFormState = {
    formData: Record<SNSKey, string>
    setFormData: (data: Record<SNSKey, string>) => void
    updateFormValue: (key: SNSKey, value: string) => void
    resetFormData: () => void
}

export const useSNSFormStore = create(
    persist<SNSFormState>(
        (set) => ({
            formData: {
                instagram: '',
                tiktok: '',
                facebook: '',
                x: '',
            },
            setFormData: (data) => set({ formData: data }),
            updateFormValue: (key, value) =>
                set((state) => ({
                    formData: { ...state.formData, [key]: value },
                })),
            resetFormData: () =>
                set({
                    formData: {
                        instagram: '',
                        tiktok: '',
                        facebook: '',
                        x: '',
                    },
                }),
        }),
        {
            name: 'sns-form-stoarge',
        }
    )
)

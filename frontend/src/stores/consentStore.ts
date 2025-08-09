import { create } from 'zustand'

type ConsentState = {
    marketingEmailAgree: boolean
    dayContentEmailAgree: boolean
    setMarketingEmailAgree: (val: boolean) => void
    setDayContentEmailAgree: (val: boolean) => void
}

export const useConsentStore = create<ConsentState>((set) => ({
    marketingEmailAgree: false,
    dayContentEmailAgree: true,
    setMarketingEmailAgree: (val) => set({ marketingEmailAgree: val }),
    setDayContentEmailAgree: (val) => set({ dayContentEmailAgree: val }),
}))

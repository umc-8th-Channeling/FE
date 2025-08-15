import { useCallback } from 'react'
import { useSettingStore } from '../../../stores/SettingStore'

export function useOpenSetting() {
    const { open } = useSettingStore().actions

    const handleOpen = useCallback(() => {
        open()
    }, [open])

    return handleOpen
}

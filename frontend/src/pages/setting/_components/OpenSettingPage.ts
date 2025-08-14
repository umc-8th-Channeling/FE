import { useSettingStore } from '../../../stores/SettingStore'

export function useOpenSetting() {
    const { open } = useSettingStore().actions

    const handleOpen = () => {
        open()
    }

    return handleOpen
}

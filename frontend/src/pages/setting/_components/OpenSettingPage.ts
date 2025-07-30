import { useNavigate } from 'react-router-dom'
import useIsMobile from '../../../hooks/main/useIsMobile'
import { useSettingStore } from '../../../stores/SettingStore'

export function useOpenSetting() {
    const isMobile = useIsMobile()
    const navigate = useNavigate()
    const { open } = useSettingStore().actions

    const handleOpen = () => {
        if (isMobile) {
            navigate('/setting')
        } else {
            open()
        }
    }

    return handleOpen
}

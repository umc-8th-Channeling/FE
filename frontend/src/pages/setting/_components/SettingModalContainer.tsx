import { useSettingStore } from '../../../stores/SettingStore'
import SettingPage from '../SettingPage'

export const SettingModalContainer = () => {
    const isOpen = useSettingStore((state) => state.isOpen)
    const { close } = useSettingStore().actions

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-[9999]">
                    <SettingPage onClose={close} />
                </div>
            )}
        </>
    )
}

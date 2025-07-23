import { useState } from 'react'
import SettingPage from '../SettingPage'

export function useSettingModal() {
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const Modal = open ? <SettingPage onClose={closeModal} /> : null

    return { openModal, Modal }
}

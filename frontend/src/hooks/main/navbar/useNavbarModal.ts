import { useState } from 'react'

export function useNavbarModals() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showViewerModal, setShowViewerModal] = useState(false)
    const [showChannelConceptModal, setShowChannelConceptModal] = useState(false)

    const [viewerValue, setViewerValue] = useState('')
    const [channelConceptValue, setChannelConceptValue] = useState('')

    const openLoginModal = () => setShowLoginModal(true)
    const closeLoginModal = () => setShowLoginModal(false)

    const openViewerModal = () => setShowViewerModal(true)
    const closeViewerModal = () => setShowViewerModal(false)

    const openChannelConceptModal = () => setShowChannelConceptModal(true)
    const closeChannelConceptModal = () => setShowChannelConceptModal(false)

    const changeViewerValue = (value: string) => setViewerValue(value)
    const changeChannelConceptValue = (value: string) => setChannelConceptValue(value)

    return {
        // 상태값
        showLoginModal,
        showViewerModal,
        showChannelConceptModal,
        viewerValue,
        channelConceptValue,

        // 열기/닫기 핸들러
        openLoginModal,
        closeLoginModal,
        openViewerModal,
        closeViewerModal,
        openChannelConceptModal,
        closeChannelConceptModal,

        // 입력값 핸들러
        changeViewerValue,
        changeChannelConceptValue,
    }
}

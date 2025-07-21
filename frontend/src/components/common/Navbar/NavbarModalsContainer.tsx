import { ChannelConceptModal, LoginModal, ViewerModal } from '../../../pages/main/_components'
import { useLoginStore } from '../../../stores/LoginStore'

export const NavbarModalsContainer = () => {
    const state = useLoginStore()
    const { showLoginModal, showViewerModal, showChannelConceptModal, viewerValue, channelConceptValue } = state
    const {
        setViewerValue,
        setChannelConceptValue,
        openViewerModal,
        openChannelConceptModal,
        closeLoginModal,
        closeViewerModal,
        closeChannelConceptModal,
    } = state.actions

    const handleLoginSuccess = () => {
        // 로그인 성공 -> 로그인 모달 닫고, viewer 모달 열기
        setViewerValue('') // viewer 초기화
        closeLoginModal()
        openViewerModal()
    }

    const handleViewerNext = () => {
        // viewer 다음 -> viewer 닫고, channelConcept 열기
        setChannelConceptValue('')
        closeViewerModal()
        openChannelConceptModal()
    }

    const handleChannelConceptSubmit = () => {
        // 마지막 모달 닫기
        closeChannelConceptModal()
    }

    return (
        <>
            {showLoginModal && <LoginModal onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />}

            {showViewerModal && (
                <ViewerModal
                    onClose={closeViewerModal}
                    value={viewerValue}
                    onChange={setViewerValue}
                    handleButtonClick={handleViewerNext}
                />
            )}

            {showChannelConceptModal && (
                <ChannelConceptModal
                    onClose={closeChannelConceptModal}
                    value={channelConceptValue}
                    onChange={setChannelConceptValue}
                    handleButtonClick={handleChannelConceptSubmit}
                />
            )}
        </>
    )
}

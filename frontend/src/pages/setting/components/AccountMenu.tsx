import type React from 'react'
import { useState } from 'react'
import { BOTTOM_LINKS } from '../../../components/common/Navbar/navbarLinks'
import { NavbarLink } from '../../../components/common/Navbar/NavbarLink'
import Modal from '../../../components/Modal'
import SettingPage from '../SettingPage'

export const AccountMenu = (): React.ReactElement => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSettingModal, setShowSettingModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleShowModalChange = () => setShowLoginModal((prev) => !prev)
    const handleSettingModalChange = () => setShowSettingModal((prev) => !prev)

    const handleLoginSuccess = () => {
        setIsLoggedIn(true)
        setShowLoginModal(false)
    }

    return (
        <>
            <div className="flex flex-col items-center">
                {isLoggedIn ? (
                    <button onClick={handleSettingModalChange} className="flex flex-col items-center py-2">
                        <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-sm text-white">
                            계
                        </div>
                        <span className="font-label-fixed text-gray-900 mt-2">계정</span>
                    </button>
                ) : (
                    BOTTOM_LINKS.map((link) => (
                        <NavbarLink key={link.alt} {...link} onLoginClick={handleShowModalChange} />
                    ))
                )}
            </div>

            {showLoginModal && (
                <Modal title="로그인" onClose={handleShowModalChange}>
                    <div className="flex flex-col items-center gap-4 p-4">
                        <p className="text-sm text-gray-600">임시 로그인 페이지입니다.</p>
                        <button onClick={handleLoginSuccess} className="px-4 py-2 bg-gray-800 text-white rounded-md">
                            로그인 완료
                        </button>
                    </div>
                </Modal>
            )}

            {showSettingModal && (
                <Modal title="" onClose={handleSettingModalChange}>
                    <SettingPage onClose={handleSettingModalChange} />
                </Modal>
            )}
        </>
    )
}

import ChannelingIcon from '../../../assets/icons/channeling.svg'
import { NavbarLink } from './NavbarLink'
import { TOP_LINKS, BOTTOM_LINKS } from './navbarLinks'
import { NavbarContainer } from './NavbarContainer'
import { ToolTipBubble } from './NavbarToolTip'
import { useState, useEffect } from 'react'
import Modal from '../../Modal'
import SettingPage from '../../../pages/setting/SettingPage'

export const NavbarDesktop = (): React.ReactElement => {
    const [isLogin, setIsLogin] = useState(false)
    const [showSettingModal, setShowSettingModal] = useState(false)

    useEffect(() => {
        // 로그인 상태 가져오기
        const loginFlag = localStorage.getItem('isLogin')
        if (loginFlag === 'true') {
            setIsLogin(true)
        }
    }, [])

    const handleOpenSettingModal = () => {
        setShowSettingModal(true)
    }

    const handleCloseSettingModal = () => {
        setShowSettingModal(false)
    }

    return (
        <>
            <NavbarContainer>
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col items-center gap-22">
                        <img src={ChannelingIcon} alt="Channeling 로고" className="w-12 h-12" />
                        <div className="flex flex-col items-center gap-6">
                            <NavbarLink {...TOP_LINKS.find((link) => link.to === '/report')!} />
                            <div className="flex flex-col items-center gap-1">
                                {TOP_LINKS.filter((link) => link.to !== '/report').map((link) => (
                                    <NavbarLink key={link.to} {...link} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        {isLogin ? (
                            <button onClick={handleOpenSettingModal} className="text-gray-600 font-caption mb-4">
                                로그인 성공
                            </button>
                        ) : (
                            BOTTOM_LINKS.map((link) => (
                                <NavbarLink key={link.alt} {...link} onLoginClick={handleOpenSettingModal} />
                            ))
                        )}
                    </div>
                </div>
                <ToolTipBubble />
            </NavbarContainer>

            {showSettingModal && (
                <Modal title="설정" onClose={handleCloseSettingModal}>
                    <SettingPage onClose={handleCloseSettingModal} />
                </Modal>
            )}
        </>
    )
}

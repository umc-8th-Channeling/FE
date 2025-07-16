import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarContainer } from './NavbarContainer'
import { NavbarLink, NavbarModalButton } from './NavbarLink'
import { ToolTipBubble } from './NavbarToolTip'
import { PLUS_LINK, NAVIGATE_LINKS, LOGIN_LINK } from './navbarLinks'
import ChannelingLogo from '../../../assets/icons/channeling.svg?react'
import { NavbarUserInfo } from './NavbarUserInfo'
import { DUMMY_USER } from './dummy'
import { ChannelConceptModal, LoginModal, UrlInputModal, ViewerModal } from '../../../pages/main/_components'
import SettingPage from '../../../pages/setting/SettingPage'

type ToolTipPos = { top: number; left: number }

export const NavbarDesktop = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showViewerModal, setShowViewerModal] = useState(false)
    const [showChannelConceptModal, setShowChannelConceptModal] = useState(false)

    const [viewerValue, setViewerValue] = useState('')
    const [channelConceptValue, setChannelConceptValue] = useState('')

    const handleViewerChange = (value: string) => {
        setViewerValue(value)
    }

    const handleCloseLoginModal = () => setShowLoginModal(false)
    const handleOpenViewerModal = () => setShowViewerModal(true)
    const handleCloseViewerModal = () => setShowViewerModal(false)
    const handleOpenChannelConceptModal = () => setShowChannelConceptModal(true)
    const handleCloseChannelConceptModal = () => setShowChannelConceptModal(false)
    const handleChangeChannelConcept = (value: string) => setChannelConceptValue(value)

    const [showPlusModal, setShowPlusModal] = useState(false)
    const isGuest = !localStorage.getItem('token')
    const user = DUMMY_USER

    const loginRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<ToolTipPos | null>(null)

    const [showSettingPage, setShowSettingPage] = useState(false)

    const handleOpenSettingPage = () => setShowSettingPage(true)
    const handleCloseSettingPage = () => setShowSettingPage(false)

    // 로그인 툴팁 위치 조정
    useEffect(() => {
        const updateTooltipPosition = () => {
            if (isGuest && loginRef.current) {
                const rect = loginRef.current.getBoundingClientRect()
                setTooltipPos({
                    top: rect.top + window.scrollY,
                    left: rect.right + window.scrollX + 32,
                })
            }
        }

        updateTooltipPosition() // 초기 실행

        // 화면 크기 변경에 따라 툴팁의 위치를 업데이트
        window.addEventListener('scroll', updateTooltipPosition)
        window.addEventListener('resize', updateTooltipPosition)

        return () => {
            window.removeEventListener('scroll', updateTooltipPosition)
            window.removeEventListener('resize', updateTooltipPosition)
        }
    }, [isGuest])

    const handleLoginModalClick = () => setShowLoginModal(!showLoginModal)
    const handlePlusModalClick = () => setShowPlusModal(!showPlusModal)

    return (
        <>
            <NavbarContainer>
                <div className="flex flex-col justify-between h-full w-full">
                    {/* 네비게이션 메뉴 */}
                    <div className="flex flex-col items-center">
                        <Link to="/" className="mb-22">
                            <ChannelingLogo />
                        </Link>

                        {/* + 버튼 */}
                        <NavbarModalButton {...PLUS_LINK} onClick={handlePlusModalClick} />

                        <div className="flex flex-col items-center gap-2 mt-6">
                            {NAVIGATE_LINKS.map((link) => (
                                <NavbarLink key={link.to} {...link} />
                            ))}
                        </div>
                    </div>

                    {/* 로그인 버튼 혹은 유저 프로필 */}
                    <div ref={loginRef} className="flex flex-col items-center">
                        {!isGuest && user ? (
                            <NavbarUserInfo user={DUMMY_USER} onClick={handleOpenSettingPage} />
                        ) : (
                            <NavbarModalButton key={LOGIN_LINK.alt} {...LOGIN_LINK} onClick={handleLoginModalClick} />
                        )}
                    </div>

                    {/* 게스트일 경우, 10초만에 로그인 툴팁 */}
                    {isGuest && tooltipPos && (
                        <div style={{ position: 'absolute', top: tooltipPos.top, left: tooltipPos.left }}>
                            <ToolTipBubble />
                        </div>
                    )}
                </div>
            </NavbarContainer>

            {showLoginModal && (
                <LoginModal
                    onClose={handleCloseLoginModal}
                    onLoginSuccess={() => {
                        handleCloseLoginModal()
                        handleOpenViewerModal()
                    }}
                />
            )}
            {showViewerModal && (
                <ViewerModal
                    onClose={handleCloseViewerModal}
                    value={viewerValue}
                    onChange={handleViewerChange}
                    handleButtonClick={() => {
                        handleCloseViewerModal()
                        handleOpenChannelConceptModal()
                    }}
                />
            )}
            {showChannelConceptModal && (
                <ChannelConceptModal
                    onClose={handleCloseChannelConceptModal}
                    value={channelConceptValue}
                    handleButtonClick={handleCloseChannelConceptModal}
                    onChange={handleChangeChannelConcept}
                />
            )}

            {/* + 버튼 유튜브 URL 입력 모달  */}
            {showPlusModal && <UrlInputModal onClose={handlePlusModalClick} />}

            {showSettingPage && <SettingPage onClose={handleCloseSettingPage} />}
        </>
    )
}

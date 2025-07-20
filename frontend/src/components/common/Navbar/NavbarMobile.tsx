// export const NavbarMobile1 = (): React.ReactElement => {
//     const [isOpen, setIsOpen] = useState(false)

//     const toggleMenu = () => setIsOpen((prev) => !prev)
//     const closeMenu = () => setIsOpen(false)

//     return (
//         <div className="block tablet:hidden">
//             {/* 상단바 */}
//             <div className="fixed top-0 w-full h-14 bg-[#262626] flex items-center px-4 z-20">
//                 <button onClick={toggleMenu} className="p-1 w-8 flex items-center justify-center">
//                     <img src={MenuIcon} alt="메뉴" />
//                 </button>
//                 <img src={ChannelingLogoIcon} alt="Channeling 글자 로고" className="w-35 ml-2" />
//             </div>

//             {/* 슬라이드형 사이드바 */}
//             <div
//                 className={`fixed top-0 left-0 h-screen w-50 bg-[#262626] p-4 flex flex-col z-30 transform ${
//                     isOpen ? 'translate-x-0' : '-translate-x-full'
//                 } transition-transform duration-300`}
//             >
//                 {/* 로고 및 닫기 버튼 */}
//                 <div className="flex items-center justify-between mb-20">
//                     <img src={ChannelingIcon} alt="Channeling 로고" className="w-10 h-10" />
//                     <button onClick={closeMenu} className="w-8 -mt-1 flex items-center justify-center">
//                         <img src={DeleteIcon} alt="닫기" />
//                     </button>
//                 </div>

//                 {/* <div className="flex flex-col">
//                     <NavbarLinksList />
//                 </div> */}

//                 <div className="flex flex-col gap-4 mt-auto">
//                     {NAVIGATE_LINKS.map((link) => (
//                         <NavbarLink key={link.to} {...link} />
//                     ))}
//                 </div>

//                 {/* 이 위치에 로그인 ? */}
//             </div>

//             {/* 사이드 바 오버레이 */}
//             {isOpen && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-20" />}
//         </div>
//     )
// }

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChannelingLogo from '../../../assets/icons/channelingLogo.svg?react'
import Channeling from '../../../assets/icons/channeling.svg?react'
import MenuIcon from '../../../assets/icons/menu.svg?react'
import X from '../../../assets/icons/X.svg?react'
import { useAuthStore } from '../../../stores/authStore'
import { NavbarLinksList } from './NavbarLinksList'
import { UrlInputModal } from '../../../pages/main/_components'
import Modal from '../../Modal' // ✅ 임시

export const NavbarMobile = () => {
    const location = useLocation()
    const [showUrlModal, setShowUrlModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember) // ✅ 임시
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false) // ✅ 임시

    const toggleMenu = () => setIsOpen(!isOpen)

    const handlePlusClick = () => setShowUrlModal(!showUrlModal)
    const handleLoginClick = () => setIsLoginModalOpen(!isLoginModalOpen)

    useEffect(() => setIsOpen(false), [location])

    return (
        <div className="block tablet:hidden">
            {/* 사이드 바 오버레이 */}
            {isOpen && <div className="fixed inset-0 bg-neutral-black-opacity50 z-20" />}

            {/* 상단 바 */}
            <div className="fixed top-0 flex items-center w-full p-4 gap-4 bg-gray-100 z-20">
                <button
                    aria-label="메뉴 토글하기"
                    onClick={toggleMenu}
                    className="flex items-center justify-center cursor-pointer"
                >
                    <MenuIcon />
                </button>
                <Channeling aria-label="Channeling 글자 로고" />
            </div>

            {/* 슬라이드형 사이드 바 */}
            <div
                className={`fixed top-0 left-0 flex flex-col w-[248px] h-screen z-30 p-4 space-y-20 bg-gray-100 
                    transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-row items-center justify-between">
                    <Link to="/">
                        <ChannelingLogo aria-label="Channeling 글자 로고" />
                    </Link>
                    <button aria-label="사이드 바 닫기" onClick={toggleMenu} className="cursor-pointer">
                        <X />
                    </button>
                </div>

                <NavbarLinksList handlePlusClick={handlePlusClick} handleLoginClick={handleLoginClick} />
            </div>

            {/* + 버튼 유튜브 URL 입력 모달  */}
            {showUrlModal && <UrlInputModal onClose={handlePlusClick} />}

            {/* ✅ 임시 로그인 모달 */}
            {isLoginModalOpen && (
                <Modal
                    title="임시 로그인 모달"
                    onClose={() => {
                        setAuthMember()
                        setIsLoginModalOpen(false)
                    }}
                />
            )}
        </div>
    )
}

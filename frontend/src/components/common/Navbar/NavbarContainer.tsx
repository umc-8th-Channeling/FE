import type { PropsWithChildren } from 'react'

// 사이드바
export const NavbarContainer = ({ children }: PropsWithChildren) => {
    return (
        <nav className="fixed top-0 left-0 z-20 flex flex-col items-start h-screen w-20 py-9 px-4 bg-[#262626]">
            {children}
        </nav>
    )
}

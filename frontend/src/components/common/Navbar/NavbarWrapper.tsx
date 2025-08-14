import { NavbarDesktop } from './NavbarDesktop'
import { NavbarMobile } from './NavbarMobile'
import { NavbarTablet } from './NavbarTablet'

export const NavbarWrapper = () => {
    return (
        <>
            <NavbarDesktop />
            <NavbarTablet />
            <NavbarMobile />
        </>
    )
}

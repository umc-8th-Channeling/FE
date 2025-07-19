import { NavbarDesktop } from './NavbarDesktop'
import { NavbarMobile } from './NavbarMobile'
import { NavbarTablet } from './NavbarTablet'

export const NavbarWrapper = () => {
    return (
        <>
            <div className="hidden desktop:block">
                <NavbarDesktop />
            </div>
            <div className="hidden tablet:block desktop:hidden">
                <NavbarTablet />
            </div>
            <div className="block tablet:hidden">
                <NavbarMobile />
            </div>
        </>
    )
}

import { useMediaQuery } from 'react-responsive';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarTablet } from './NavbarTablet';
import { NavbarMobile } from './NavbarMobile';

export const NavbarWrapper = (): React.ReactElement => {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  if (isDesktop) {
  return <NavbarDesktop />;
} else if (isTablet) {
  return <NavbarTablet />;}
   else {
  return <NavbarMobile />;
}
};

import ChannelingIcon from '../../../assets/icons/channeling.svg';
import { NavbarLink } from './NavbarLink';
import { TOP_LINKS, BOTTOM_LINKS } from './navbarLinks';
import { NavbarContainer } from './NavbarContainer';

export const NavbarDesktop = (): React.ReactElement => {
  return (
    <NavbarContainer justifyBetween>
      <div>
        <div className="flex justify-center mb-1 py-4">
          <img src={ChannelingIcon} alt="Channeling 로고" className="w-10 h-10" />
        </div>
        <div className="py-12">
        {TOP_LINKS.map(link => <NavbarLink key={link.to} {...link} />)}
        </div>
      </div>
      <div>
        {BOTTOM_LINKS.map(link => <NavbarLink key={link.to} {...link} />)}
      </div>
    </NavbarContainer>
  );
};

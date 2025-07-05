import { useMediaQuery } from 'react-responsive';
import { NavbarLink } from "./NavbarLink";
import { TOP_LINKS } from "./navbarLinks";

export const NavbarLinksList = () => {
  const isMdUp = useMediaQuery({ minWidth: 1440 });

  return (
    <div className="flex flex-col gap-4">
      {TOP_LINKS
        .filter(link => link.to !== "/new" || isMdUp)
        .map(link => (
          <NavbarLink key={link.to} {...link} />
        ))}
    </div>
    
  )
}

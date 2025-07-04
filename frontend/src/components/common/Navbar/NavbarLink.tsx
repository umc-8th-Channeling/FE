import { NavLink } from "react-router-dom";
import { IconWrapper } from "../IconWrapper";
import type { LinkItem } from "./navbarLinks";

{/* NavbarLinksList의 className을 받도록 재설정 */}
type NavbarLinkProps = LinkItem & {
  className?: string;
};

export const NavbarLink = (props: NavbarLinkProps): React.ReactElement => {
  const { to, label, defaultIcon, hoverIcon, activeIcon, alt, isCircle, size, className } = props;

  return (
    <NavLink to={to} end={true} className={`block w-full ${className ?? ""}`}>
      {({ isActive }) => (
        <div className="flex flex-row ml-2 lg:-ml-1 lg:flex-col items-start lg:items-center py-2 w-full h-full justify-start lg:justify-center">
          <div className="flex items-start lg:items-center">
          <IconWrapper
            defaultIcon={defaultIcon}
            hoverIcon={hoverIcon}
            activeIcon={activeIcon}
            alt={alt}
            isCircle={isCircle}
            isActive={isActive}
            size={size}
          />
          </div>
          {/* 모바일&태블릿용 로그인 텍스트 조금 더 아래로 위치시킴 */}
          {label && (
            <span className={`font-caption leading-normal text-center text-white ml-2 lg:ml-0 
               ${label === "로그인" ? "mt-2" : "mt-0"} lg:mt-1`}>{label}</span>
          )}
        </div>
      )}
    </NavLink>
  );
};

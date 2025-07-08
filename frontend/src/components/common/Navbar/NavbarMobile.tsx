import { useState } from "react";
import ChannelingIcon from "../../../assets/icons/channeling.svg";
import ChannelingLogoIcon from "../../../assets/icons/channeling_logo.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import DeleteIcon from "../../../assets/icons/delete_normal.svg";
import { NavbarLink } from "./NavbarLink";
import { BOTTOM_LINKS } from "./navbarLinks";
import { NavbarLinksList } from "./NavbarLinksList";

export const NavbarMobile = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* 상단바 */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-[#262626] flex items-center px-4 z-20">
        <button
          onClick={toggleMenu}
          className="p-1 w-8 flex items-center justify-center">
          <img src={MenuIcon} alt="메뉴" />
        </button>
        <img src={ChannelingLogoIcon} alt="Channeling 글자 로고" className="w-35 ml-2" />
      </div>

      {/* 슬라이드형 사이드바 */}
      <div
        className={`fixed top-0 left-0 h-screen w-50 bg-[#262626] p-4 flex flex-col z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* 로고 및 닫기 버튼 */}
        <div className="flex items-center justify-between mb-20">
          <img src={ChannelingIcon} alt="Channeling 로고" className="w-10 h-10" />
          <button
            onClick={closeMenu}
            className="w-8 -mt-1 flex items-center justify-center">
            <img src={DeleteIcon} alt="닫기" />
          </button>
        </div>

        <div className="flex flex-col">
          <NavbarLinksList />
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          {BOTTOM_LINKS.map(link => (
            <NavbarLink key={link.to} {...link} />
          ))}
        </div>
      </div>

      {/* 사이드 바 오버레이 */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-20"
        />
      )}
    </>
  );
};

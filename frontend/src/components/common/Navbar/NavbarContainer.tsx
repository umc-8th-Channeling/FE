type NavbarContainerProps = {
  children: React.ReactNode;
};

{/* 사이드바 */}
export const NavbarContainer = ({ children }: NavbarContainerProps): React.ReactElement => {
  const baseClass = `fixed top-0 left-0 h-screen w-20 bg-[#262626] flex flex-col z-20
  items-start py-9 px-4`;
  return (
    <nav className={baseClass}>
      {children}
    </nav>
  );
};

type NavbarContainerProps = {
  children: React.ReactNode;
  justifyBetween?: boolean;
};

{/* 사이드바 */}
export const NavbarContainer = ({ children, justifyBetween }: NavbarContainerProps): React.ReactElement => {
  const baseClass = "fixed top-0 left-0 h-screen w-18 bg-[#262626] p-4 flex flex-col z-20";
  const finalClass = justifyBetween ? `${baseClass} justify-between` : baseClass;

  return (
    <nav className={finalClass}>
      {children}
    </nav>
  );
};

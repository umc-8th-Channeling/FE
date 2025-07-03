import React, { useState } from "react";

type IconWrapperProps = {
  defaultIcon: string;
  hoverIcon?: string;
  activeIcon?: string;
  alt: string;
  label?: string;
  isCircle: boolean;
  isActive: boolean;
  size?: "sm" | "md" | "lg";
};

export const IconWrapper = ({ defaultIcon, hoverIcon ,activeIcon, alt, isCircle, isActive, size="md" }: IconWrapperProps): React.ReactElement => {
  const [isHover, setIsHover] = useState(false);

  const currentIcon = isActive
  ? activeIcon
  : isHover
  ? hoverIcon
  : defaultIcon;

  const sizeClass = size === "lg" ? "w-9 h-9" : size === "sm" ? "w-7 h-7" : "w-7 h-7";

  return isCircle ? (
    <div className="w-10 h-10 rounded-full bg-[#393939] flex items-center justify-center mb-1"
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    >
      <img src={currentIcon} alt={alt} className={sizeClass} />
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center mb-2"
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    >
      <img src={currentIcon} alt={alt} className={sizeClass} />
    </div>
  );
};

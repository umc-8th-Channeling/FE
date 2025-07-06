import { useEffect, useState } from "react";
import ToolTipIcon from "../../../assets/icons/tooltip.svg";

export const ToolTipBubble = (): React.ReactElement | null => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        absolute left-4 bottom-16
        w-[140px] h-[38px] pr-[9px]
        flex items-center
      "
    >
      <div className="w-24 flex-none"></div>
      <img src={ToolTipIcon} alt="툴팁" id="tooltip" />
    </div>
  );
};

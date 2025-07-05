import ToolTipIcon from "../../../assets/icons/tooltip.svg";

export const ToolTipBubble = (): React.ReactElement => {
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

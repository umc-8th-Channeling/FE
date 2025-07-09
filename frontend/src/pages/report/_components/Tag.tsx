export const Tag = ({ text }: { text: string }) => {
    return (
        <div className="w-fit px-2 py-1 bg-primary-opacity50 rounded-xs">
            <span className="text-[14px] font-medium leading-[140%] tracking-[-0.35px]">{text}</span>
        </div>
    )
}

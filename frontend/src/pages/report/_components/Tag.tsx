export const Tag = ({ text }: { text: string }) => {
    return (
        <div className="w-fit px-2 py-1 bg-primary-opacity50 rounded-xs">
            <span className="font-caption-14m">{text}</span>
        </div>
    )
}

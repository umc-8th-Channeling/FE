interface MyVideoCardProps {
    onClick?: () => void
}

export default function MyVideoCard({ onClick }: MyVideoCardProps) {
    return (
        <div className="flex flex-col h-[240px] items-center gap-[8px] " onClick={onClick}>
            <div className="w-[282px] h-[158px] shrink-0 aspect-[141/79] rounded-[8px] bg-primary-600"></div>
            <div className="flex flex-col items-start gap-[4px] w-full ">
                <div className="max-h-[50px] self-stretch text-gray-900 text-[18px] font-bold overflow-ellipsis leading-[140%] tracking-[-0.45px]">
                    저 드디어 독립했어요!
                </div>
                <div className="self-stretch text-gray-600 text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                    조회수 17만회 · 3년 전
                </div>
            </div>
        </div>
    )
}

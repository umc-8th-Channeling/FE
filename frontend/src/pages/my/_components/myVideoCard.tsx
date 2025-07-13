interface MyVideoCardProps {
    onClick?: () => void
}

export default function MyVideoCard({ onClick }: MyVideoCardProps) {
    return (
        <div className="w-[282px] h-[215px] gap-[8px] " onClick={onClick}>
            <div className="h-[158px] rounded-[8px] bg-primary-600"></div>
            <div className="h-[49px] mt-[8px]">
                <div className="text-gray-900 text-[18px] font-bold leading-[140%] tracking-[-0.45px]">
                    저 드디어 독립했어요!
                </div>
                <div className="text-gray-600 text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                    조회수 17만회 · 3년 전
                </div>
            </div>
        </div>
    )
}

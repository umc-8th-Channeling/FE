interface MyShortsCardProps {
    onClick?: () => void
}

export default function MyShortsCard({ onClick }: MyShortsCardProps) {
    return (
        <div className="w-[190px] h-[371px] gap-[8px]" onClick={onClick}>
            <div className="h-[289px] rounded-[8px] bg-primary-800"></div>
            <div className="flex flex-col gap-[4px] mt-[8px] items-start">
                <div className="text-gray-900 text-[18px] font-bold leading-[140%] tracking-[-0.45px]">
                    주식매매기법 100보다 이 선 하나가 더 중요합니다
                </div>
                <div className="text-gray-600 text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                    조회수 17만회 · 3년 전
                </div>
            </div>
        </div>
    )
}

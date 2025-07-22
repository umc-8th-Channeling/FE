interface MyShortsCardProps {
    onClick?: () => void
}

export default function MyShortsCard({ onClick }: MyShortsCardProps) {
    return (
        <div
            className="flex flex-col h-fit items-center tablet:gap-x-[9px] desktop:gap-[8px] shrink-0"
            onClick={onClick}
        >
            <div className="w-full aspect-[192/289] rounded-[8px] bg-primary-800"></div>
            <div className="w-full gap-1 mt-[8px] items-start">
                <div className="max-h-[50px] text-gray-900 text-[18px] multi-line-ellipsis font-bold leading-[140%] tracking-[-0.45px]">
                    통행을 방해하는 불법 주차 차량을 보았다. 트윈스의
                    선택은?[LP]ddddddddddddddddddpppppppppppppppppppppppp
                </div>
                <div className="text-gray-600 text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                    조회수 17만회 · 3년 전
                </div>
            </div>
        </div>
    )
}

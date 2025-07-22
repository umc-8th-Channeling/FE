interface MyShortsCardProps {
    onClick?: () => void
}

export default function MyShortsCard({ onClick }: MyShortsCardProps) {
    return (
        <div
            className="flex w-[190px] h-[371px] flex-col items-center tablet:gap-x-[9px] desktop:gap-[8px] shrink-0"
            onClick={onClick}
        >
            <div className="w-[192px] h-[289px] rounded-[8px] aspect-[192/289] bg-primary-800"></div>
            <div className=" w-[190px] h-[371px] gap-[4px] mt-[8px] items-start">
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

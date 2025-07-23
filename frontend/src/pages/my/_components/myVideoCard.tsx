interface MyVideoCardProps {
    onClick?: () => void
}

export default function MyVideoCard({ onClick }: MyVideoCardProps) {
    return (
        <div className="flex flex-col h-fit items-center gap-[8px] " onClick={onClick}>
            <div className="w-full aspect-[141/79] shrink-0 rounded-[8px] bg-primary-600"></div>
            <div className="flex flex-col items-start gap-[4px] w-full ">
                <div className="self-stretch text-gray-900 text-[16px] tablet:text-[18px] font-bold multi-line-ellipsis leading-[140%] tracking-[-0.45px]">
                    통행을 방해하는 불법 주차 차량을 보았다. 트윈스의
                    선택은?[LP]ddddddddddddddddddpppppppppppppppppppppppp
                </div>
                <div className="self-stretch text-gray-600 text-[12px] tablet:text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                    조회수 17만회 · 3년 전
                </div>
            </div>
        </div>
    )
}

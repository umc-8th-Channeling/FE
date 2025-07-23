import type { Video } from '../../../types/profile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import { formatKoreanNumber, formatRelativeTime } from '../../../utils/format'

interface MyVideoCardProps {
    video: Video
}

export default function MyVideoCard({ video }: MyVideoCardProps) {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const getReport = () => {
        setOpen(false)
        navigate('/report')
    }

    return (
        <>
            <div className="flex flex-col h-fit items-center gap-[8px] " onClick={() => setOpen(true)}>
                <div className="w-full aspect-[141/79] shrink-0 rounded-[8px]    ">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-start gap-[4px] w-full ">
                    <div className="self-stretch text-gray-900 text-[16px] tablet:text-[18px] font-bold multi-line-ellipsis leading-[140%] tracking-[-0.45px]">
                        {video.title}
                    </div>
                    <div className="self-stretch text-gray-600 text-[12px] tablet:text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                        조회수 {formatKoreanNumber(video.viewCount)}회 · {formatRelativeTime(video.publishedAt)}
                    </div>
                </div>
            </div>
            {open && (
                <Modal
                    title="해당 영상에 대한 리포트를 받아 보시겠어요?"
                    description={`‘${video.title}’을 유튜버님의 타겟과 컨셉을 고려하여 분석해요.`}
                    onClose={() => setOpen(false)}
                    className="w-[486px]"
                >
                    <div className="flex justify-end">
                        <div className="flex justify-between w-[214px] h-[40px] items-end">
                            <button
                                className="w-[101px] h-[40px] text-[16px] font-bold text-gray-600 border-[1px] border-gray-300 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="w-[103px] h-[40px] text-[16px] font-bold text-gray-900 bg-primary-500 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer"
                                onClick={getReport}
                            >
                                리포트 받기
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

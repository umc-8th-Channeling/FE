import type { Video } from '../../../types/profile'
import { useState } from 'react'

import { formatKoreanNumber, formatRelativeTime } from '../../../utils/format'
import { MyReportModal } from './myReportModal'

interface MyVideoCardProps {
    video: Video
}

export default function MyVideoCard({ video }: MyVideoCardProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col h-full items-center gap-[8px] " onClick={() => setOpen(true)}>
                <div className="w-full aspect-[141/79] shrink-0 rounded-[8px] ">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full flex flex-col h-[74px] items-start gap-[4px] ">
                    <div className="self-stretch text-gray-900 text-[16px] tablet:text-[18px] font-bold multi-line-ellipsis leading-[140%] tracking-[-0.45px]">
                        {video.title}
                    </div>
                    <div className="self-stretch text-gray-600 text-[12px] tablet:text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                        조회수 {formatKoreanNumber(video.viewCount)}회 · {formatRelativeTime(video.publishedAt)}
                    </div>
                </div>
            </div>
            {open && <MyReportModal title={video.title} setOpen={setOpen} />}
        </>
    )
}

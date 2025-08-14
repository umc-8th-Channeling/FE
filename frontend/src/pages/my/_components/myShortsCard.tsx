import { useState } from 'react'
import type { Video } from '../../../types/profile'
import { formatKoreanNumber, formatRelativeTime } from '../../../utils/format'
import { MyReportModal } from './myReportModal'

interface MyShortsCardProps {
    shorts: Video
}

export default function MyShortsCard({ shorts }: MyShortsCardProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                className="flex flex-col h-fit items-center tablet:gap-x-[9px] desktop:gap-[8px] shrink-0"
                onClick={() => setOpen(true)}
            >
                <div className="w-full aspect-[192/289] rounded-[8px]">
                    <img src={shorts.thumbnailUrl} alt={shorts.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full gap-1 h-[74px] mt-[8px] items-start">
                    <div className="text-gray-900 text-[16px] tablet:text-[18px] multi-line-ellipsis font-bold leading-[140%] tracking-[-0.45px]">
                        {shorts.title}
                    </div>
                    <div className="text-gray-600 text-[12px] tablet:text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                        조회수 {formatKoreanNumber(shorts.viewCount)}회 · {formatRelativeTime(shorts.publishedAt)}
                    </div>
                </div>
            </div>
            {open && <MyReportModal videoId={shorts.id} title={shorts.title} setOpen={setOpen} />}
        </>
    )
}

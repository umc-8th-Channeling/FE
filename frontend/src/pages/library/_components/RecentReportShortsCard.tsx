import { memo, type MouseEvent } from 'react'
import X from '../../../assets/icons/X.svg?react'
import { formatRelativeTime, formatSimpleDate } from '../../../utils/format'
import type { BriefReport } from '../../../types/report/all'

interface RecentReportShortsCardProps {
    item: BriefReport
    onDelete?: () => void
    handleClick: () => void
}

export default memo(function RecentReportShortsCard({ item, onDelete, handleClick }: RecentReportShortsCardProps) {
    const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete?.()
    }

    return (
        <div className="rounded-lg bg-transparent space-y-2 cursor-pointer">
            <div className="relative group space-y-2">
                <div className="flex items-center justify-between">
                    <p className="font-caption-14r text-gray-600">업데이트 : {formatSimpleDate(item.updatedAt + 'Z')}</p>
                    <button
                        onClick={handleDeleteClick}
                        className="w-6 h-6 -right-[5px] top-0 -mr-2
                opacity-0 max-tablet:opacity-100 group-hover:opacity-100 
                 transition-opacity duration-300"
                    >
                        <X className="w-full h-full fill-gray-900 " />
                    </button>
                </div>

                <div onClick={handleClick} className="w-full aspect-[95/143] rounded-lg overflow-hidden shrink-0">
                    <img src={item.videoThumbnailUrl} alt={item.videoTitle} className="w-full h-full object-cover" />
                </div>
            </div>

            <div>
                <h3 className="font-title-18b text-gray-900">{item.videoTitle}</h3>
                <p className="font-caption-14r text-gray-600">
                    {item.channelName} · 조회수 {item.viewCount.toLocaleString()}회 ·{' '}
                    {formatRelativeTime(item.uploadDate)}
                </p>
            </div>
        </div>
    )
})

import { memo, type MouseEvent } from 'react'
import X from '../../../assets/icons/X.svg?react'
import type { BriefReport } from '../../../types/report/all'
import { formatRelativeTime, formatSimpleDate } from '../../../utils/format'

interface RecentReportCardProps {
    item: BriefReport
    onDelete?: () => void
    handleClick: () => void
}

export default memo(function RecentReportCard({ item, onDelete, handleClick }: RecentReportCardProps) {
    const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete?.()
    }

    return (
        <div className="relative rounded-lg overflow-hidden bg-transparent space-y-2 cursor-pointer">
            <div className="flex items-center justify-between">
                <p className="font-caption-14r text-gray-600">업데이트 : {formatSimpleDate(item.updatedAt + 'Z')}</p>
                <button
                    onClick={handleDeleteClick}
                    className="absolute w-6 h-6 -right-[4px] opacity-0 hover:opacity-100 cursor-pointer"
                >
                    <X className="w-full h-full fill-gray-900 " />
                </button>
            </div>

            <div onClick={handleClick} className="w-full aspect-[141/79] rounded-lg overflow-hidden shrink-0">
                <img src={item.videoThumbnailUrl} alt={item.videoTitle} className="w-full h-full object-cover" />
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

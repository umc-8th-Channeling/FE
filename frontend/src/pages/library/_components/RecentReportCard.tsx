import { memo } from 'react'
import type { LibraryItem } from '../../../types/library'
import X from '../../../assets/icons/X.svg?react'

export default memo(function RecentReportCard({ item, onDelete }: { item: LibraryItem; onDelete?: () => void }) {
    return (
        <div className="relative group rounded-lg overflow-hidden bg-transparent ">
            <div className="flex items-center justify-between">
                <p className="text-sm font-normal leading-[19.6px] tracking-[-0.35px] text-gray-600">
                    업데이트 : {item.updatedAt}
                </p>
                <button onClick={onDelete} className="absolute w-6 h-6 -right-[4px] hidden group-hover:block ">
                    <X className="w-full h-full fill-gray-900 " />
                </button>
            </div>

            <img src={item.thumbnail} alt={item.title} className="w-full aspect-video object-cover mt-2 mb-2" />

            <div>
                <h3 className="text-[18px] font-bold leading-[25.2px] tracking-[-0.45px]">{item.title}</h3>
                <p className="text-sm font-normal leading-[19.6px] tracking-[-0.35px] text-gray-600">
                    {item.channel} · 조회수 {item.views.toLocaleString()}회 · {item.daysAgo}년 전
                </p>
            </div>
        </div>
    )
})

import { memo } from 'react'
import type { LibraryItem } from '../../../types/library'

export default memo(function RecentReportShortsCard({ item }: { item: LibraryItem }) {
    return (
        <div className=" rounded-lg bg-cover bg-center overflow-hidden bg-transparent">
            <p className="text-sm font-normal leading-[19.6px] tracking-[-0.35px] text-gray-600">
                업데이트 : {item.updatedAt}
            </p>

            <img src={item.thumbnail} alt={item.title} className="w-full aspect-[192/289] object-cover mt-2 mb-2" />

            <div>
                <h3 className="text-[18px] font-bold leading-[25.2px] tracking-[-0.45px]">{item.title}</h3>
                <p className="text-sm font-normal leading-[19.6px] tracking-[-0.35px] text-gray-600">
                    {item.channel} · 조회수 {item.views.toLocaleString()}회 · {item.daysAgo}년 전
                </p>
            </div>
        </div>
    )
})

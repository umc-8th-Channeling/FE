import type { LibraryItem } from '../../../types/library';

export default function RecentReportCard({ item }: { item: LibraryItem }) {
    return (
        <div className="w-full rounded-lg overflow-hidden bg-transparent ">
            <p className="text-sm font-normal leading-[19.6px] tracking-[-0.35px] text-gray-600 mb-1 mt-2 ">
                업데이트 : {item.updatedAt}
            </p>

            <img src={item.thumbnail} alt={item.title} className="w-full aspect-video object-cover" />

            <div className="mt-2 ">
                <h3 className="text-[18px] font-bold leading-[25.2px] tracking-[-0.45px]">{item.title}</h3>
                <p className="text-sm font-normal leading-[19.6px] tracking-[-0.35px] text-gray-600 mt-1">
                    {item.channel} · 조회수 {item.views.toLocaleString()}회 · {item.daysAgo}년 전
                </p>
            </div>
        </div>
    );
}

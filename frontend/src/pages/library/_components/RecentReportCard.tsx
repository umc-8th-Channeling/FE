import type { LibraryItem } from '../../../types/library';

export default function RecentReportCard({ item }: { item: LibraryItem }) {
    return (
        <div className="w-full rounded-lg overflow-hidden bg-transparent ">
            <p className="text-xs text-gray-400 mb-1 mt-2 font-pretendard">업데이트 : {item.updatedAt}</p>

            <img src={item.thumbnail} alt={item.title} className="w-full aspect-video object-cover" />

            <div className="mt-2 font-pretendard">
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">
                    {item.channel} · 조회수 {item.views.toLocaleString()}회 · {item.daysAgo}년 전
                </p>
            </div>
        </div>
    );
}

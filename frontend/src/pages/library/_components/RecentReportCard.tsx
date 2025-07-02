import type { LibraryItem } from '../../../types/library';

export default function LibraryCard({ item }: { item: LibraryItem }) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
                <div className="w-36 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <span className="px-2 py-0.5 text-xs bg-purple-200 rounded-full">채널</span>
                        <span>{item.channel}</span>
                        <span>{item.daysAgo}일 전</span>
                    </div>
                </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 transition">
                ⋮
            </button>
        </div>
    );
}

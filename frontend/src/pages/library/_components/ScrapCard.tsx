import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import type { ScrapItem } from '../../../types/library';

export default function ScrapCard({ item }: { item: ScrapItem }) {
    const [isFilled, setIsFilled] = useState(true); // true면 채워짐

    return (
        <div className="relative w-full p-5 border border-gray-200 rounded-xl min-h-[200px] bg-white shadow-sm hover:shadow-md transition">
            <Bookmark
                className="absolute top-5 right-5 w-5 h-5 cursor-pointer text-black"
                fill={isFilled ? '#000' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => setIsFilled(!isFilled)}
            />

            <h3 className="font-bold mb-2 text-base">{item.title}</h3>

            <p className="text-sm text-gray-500 mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-2">
                {item.hashtags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

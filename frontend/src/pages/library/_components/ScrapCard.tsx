import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import type { ScrapItem } from '../../../types/library';

export default function ScrapCard({ item }: { item: ScrapItem }) {
    const [isFilled, setIsFilled] = useState(true); // true면 채워짐

    return (
        <div className="relative w-full p-5 rounded-md min-h-[150px] bg-[#1f1f1f] text-white hover:shadow transition">
            <Bookmark
                className="absolute top-5 right-5 w-5 h-5 cursor-pointer text-primary-500"
                fill={isFilled ? 'var(--color-primary-500)' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => setIsFilled(!isFilled)}
            />

            <h3 className="font-bold mb-2 flex items-center gap-2">
                <span>코케트(coquette) 패션 인사</span>
            </h3>

            <p className=" text-gray-800 mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-2">
                {item.hashtags.map((tag) => (
                    <span key={tag} className="text-xs text-white bg-[var(--color-primary-500)] px-2 py-0.5 rounded-xs">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

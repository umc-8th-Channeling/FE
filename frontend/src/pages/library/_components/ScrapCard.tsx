import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import type { ScrapItem } from '../../../types/library';

export default function ScrapCard({ item }: { item: ScrapItem }) {
    const [isFilled, setIsFilled] = useState(true); // true면 채워짐

    return (
        <div className="relative w-full p-5 rounded-lg bg-gray-100 hover:shadow transition">
            <Bookmark
                className="absolute top-5 right-5 w-5 h-5 cursor-pointer text-primary-500"
                fill={isFilled ? 'var(--color-primary-500)' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => setIsFilled(!isFilled)}
            />

            <h3 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-2 flex items-center gap-2">
                <span>코케트(coquette) 패션 인사</span>
            </h3>

            <p className="font-normal leading-[27px] tracking-[-0.45px] text-gray-900 mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-2 text-base font-medium leading-[24px] tracking-[-0.4px]">
                {item.hashtags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-900 bg-primary-300 px-2 py-0.5 rounded-xs">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

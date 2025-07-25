import { memo, useState } from 'react'
import Bookmark from '../../../assets/icons/bookmark.svg?react'
import BookmarkActive from '../../../assets/icons/bookmark_active.svg?react'
import type { ScrapItem } from '../../../types/library'

export default memo(function ScrapCard({ item, onDelete }: { item: ScrapItem; onDelete?: () => void }) {
    const [isFilled, setIsFilled] = useState(true) // true면 채워짐

    const handleToggle = () => {
        if (isFilled) {
            setIsFilled(false)
            onDelete?.()
        } else {
            setIsFilled(true)
        }
    }

    return (
        <div className="relative w-full p-5 rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-300 duration-300 transition">
            {isFilled ? (
                <BookmarkActive className="absolute top-5 right-5 w-5 h-5 cursor-pointer" onClick={handleToggle} />
            ) : (
                <Bookmark className="absolute top-5 right-5 w-5 h-5 cursor-pointer" onClick={handleToggle} />
            )}

            <h3 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-2 flex items-center gap-2">
                <span>코케트(coquette) 패션 인사</span>
            </h3>

            <p className="font-normal leading-[27px] tracking-[-0.45px] text-gray-900 mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-2 text-base font-medium leading-[24px] tracking-[-0.4px]">
                {item.hashtags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-900 bg-primary-opacity50 px-2 py-0.5 rounded-xs">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    )
})

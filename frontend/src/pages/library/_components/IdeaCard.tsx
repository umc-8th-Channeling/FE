import { memo, useMemo } from 'react'
import BookmarkActive from '../../../assets/icons/bookmark_active.svg?react'
import type { Idea } from '../../../types/idea'
import usePatchIdeaBookmark from '../../../hooks/idea/usePatchIdeaBookmark'

export default memo(function IdeaCard({ item }: { item: Idea }) {
    const { mutate: updateBookmark } = usePatchIdeaBookmark()

    const parsedHashTags: string[] = useMemo(() => {
        try {
            // hashTag가 문자열로 오는 경우 배열로 파싱
            return Array.isArray(item.hashTag) ? item.hashTag : JSON.parse(item.hashTag)
        } catch {
            return []
        }
    }, [item.hashTag])

    const handleBookmarkDelete = () => {
        updateBookmark({ ideaId: item.ideaId })
    }

    return (
        <div className="relative w-full p-5 rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-300 duration-300 transition">
            <BookmarkActive className="absolute top-5 right-5 w-5 h-5 cursor-pointer" onClick={handleBookmarkDelete} />

            <h3 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-2 flex items-center gap-2">
                <span>{item.title}</span>
            </h3>

            <p className="font-normal leading-[27px] tracking-[-0.45px] text-gray-900 mb-4">{item.content}</p>

            <div className="flex flex-wrap gap-2 text-base font-medium leading-[24px] tracking-[-0.4px]">
                {Object.values(parsedHashTags).map((tag) => (
                    <span key={tag} className="text-xs text-gray-900 bg-primary-opacity50 px-2 py-0.5 rounded-xs">
                        #{tag.trim()}
                    </span>
                ))}
            </div>
        </div>
    )
})

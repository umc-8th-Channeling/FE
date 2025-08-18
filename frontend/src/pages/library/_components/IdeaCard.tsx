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
        } catch (e) {
            console.error('해시태그 파싱 실패:', e)
            return []
        }
    }, [item.hashTag])

    const handleBookmarkDelete = () => {
        updateBookmark({ ideaId: item.ideaId })
    }

    return (
        <div className="relative w-full p-5 rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-300 duration-300 transition">
            <BookmarkActive className="absolute top-5 right-5 w-5 h-5 cursor-pointer" onClick={handleBookmarkDelete} />

            <h3 className="font-title-20b mb-2 flex items-center gap-2">
                <span>{item.title}</span>
            </h3>

            <p className="font-body-18r text-gray-900 mb-4">{item.content}</p>

            <div className="flex flex-wrap gap-2 text-base leading-[24px] tracking-[-0.4px]">
                {Object.values(parsedHashTags).map((tag) => (
                    <span key={tag} className="font-body-16m text-gray-900 bg-primary-opacity50 px-2 py-0.5 rounded-xs">
                        #{tag.trim()}
                    </span>
                ))}
            </div>
        </div>
    )
})

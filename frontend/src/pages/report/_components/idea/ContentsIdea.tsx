import { TitledSection } from '../TitledSection'
import { IDEA_NEXT_CONTENTS } from '../../dummy'
import BookmarkInactive from '../../../../assets/icons/bookmark.svg?react'
import BookmarkActive from '../../../../assets/icons/bookmark_active.svg?react'

export const ContentsIdea = () => {
    return (
        <TitledSection title="다음 콘텐츠 아이디어">
            <div className="space-y-6">
                {IDEA_NEXT_CONTENTS.map((idea, index) => (
                    <IdeaBox key={index} idea={idea} />
                ))}
            </div>
        </TitledSection>
    )
}

const IdeaBox = ({ idea }: { idea: (typeof IDEA_NEXT_CONTENTS)[0] }) => {
    const handleBookmarkClick = () => {
        console.log('Idea Tab of Report Page: bookmarked #', idea.id)
    }

    return (
        <div className="relative p-6 space-y-4 rounded-lg border border-gray-200 bg-surface-elevate-l1">
            <div className="flex flex-row gap-4">
                <h3 className="flex-1 line-clamp-1 text-[18px] tablet:text-[20px] font-bold leading-[140%] tracking-[-0.5px]">
                    {idea.title}
                </h3>

                {/* 북마크 버튼 */}
                <button onClick={handleBookmarkClick} className="cursor-pointer">
                    {idea.hasBookmark ? <BookmarkActive /> : <BookmarkInactive />}
                </button>
            </div>
            <p className="min-h-[calc(1em*1.5*2)] line-clamp-2 text-[14px] tablet:text-[18px] leading-[150%] tracking-[-0.45px] text-gray-600">
                {idea.description}
            </p>
            <div className="flex flex-row flex-wrap gap-2">
                {idea.tags.map((tag, index) => (
                    <p
                        key={index}
                        className="px-2 py-1 rounded-xs bg-primary-opacity50 text-[14px] tablet:text-[16px] font-medium leading-[150%] tracking-[-0.4px]"
                    >
                        #{tag}
                    </p>
                ))}
            </div>
        </div>
    )
}

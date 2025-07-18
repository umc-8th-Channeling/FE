import { TitledSection } from '../TitledSection'
import { IDEA_NEXT_CONTENTS } from '../../dummy'
import BookmarkInactive from '../../../../assets/icons/bookmark.svg?react'
import BookmarkActive from '../../../../assets/icons/bookmark_active.svg?react'

const IdeaBox = ({ idea }: { idea: (typeof IDEA_NEXT_CONTENTS)[0] }) => {
    const handleBookmarkClick = () => {
        console.log('Idea Tab of Report Page: bookmarked #', idea.id)
    }

    return (
        <div className="relative p-6 space-y-4 rounded-lg border border-gray-200 bg-surface-elevate-l1">
            <h3 className="text-[18px] tablet:text-[20px] font-bold leading-[140%] tracking-[-0.5px]">{idea.title}</h3>
            <p className="text-[14px] tablet:text-[18px] leading-[150%] tracking-[-0.45px]">{idea.description}</p>
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

            {/* 북마크 버튼 */}
            <button onClick={handleBookmarkClick} className="absolute cursor-pointer top-6 right-6">
                {idea.hasBookmark ? <BookmarkActive /> : <BookmarkInactive />}
            </button>
        </div>
    )
}

export const NextContentsIdea = () => {
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

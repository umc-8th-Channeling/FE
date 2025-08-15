import { useState } from 'react'
import Pagination from '../../../components/Pagination'
import IdeaCard from './IdeaCard'
import useGetBookmarkedIdeas from '../../../hooks/idea/useGetBookmarkedIdeas'
import { IdeaSkeleton } from './IdeaSkeleton'
// import type { BookmarkedIdeas } from '../../../types/idea'

export default function IdeaTab() {
    const [ideaPage, setIdeaPage] = useState(1)
    const [ideaStartPage, setIdeaStartPage] = useState(1)
    const itemsPerPage = 6

    const { data, isLoading } = useGetBookmarkedIdeas({ page: ideaPage, size: itemsPerPage })

    if (!data || isLoading) return <IdeaSkeleton />

    return (
        <>
            <div className="flex">
                <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px]">{data.total}개의 스크랩</p>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-1 gap-6">
                {data.bookmarkedIdeaList.map((item) => (
                    <IdeaCard key={item.ideaId} item={item} />
                ))}
            </div>

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    key={`idea-${ideaPage}`}
                    totalItems={Math.max(1, data.total)} //최소 1개 보장
                    itemCountPerPage={itemsPerPage}
                    currentPage={ideaPage}
                    startPage={ideaStartPage}
                    setStartPage={setIdeaStartPage}
                    onChangePage={setIdeaPage}
                />
            </div>
        </>
    )
}

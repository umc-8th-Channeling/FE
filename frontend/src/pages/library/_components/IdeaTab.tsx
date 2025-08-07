import { useEffect, useState } from 'react'
import Pagination from '../../../components/Pagination'
import IdeaCard from './IdeaCard'
import type { BookmarkedIdea } from '../../../types/idea'
import { useBookmarkedIdeas } from '../../../hooks/library/idea/useBookmarkedIdeas'

export default function IdeaTab() {
    const [ideaList, setIdeaList] = useState<BookmarkedIdea[]>([])
    const [ideaPage, setIdeaPage] = useState(1)
    const [ideaStartPage, setIdeaStartPage] = useState(1)

    const itemsPerPage = 6
    const offset = (ideaPage - 1) * itemsPerPage
    const currentItems = ideaList.slice(offset, offset + itemsPerPage)

    const { data, isLoading } = useBookmarkedIdeas(ideaPage, itemsPerPage)

    useEffect(() => {
        if (data?.result?.bookmarkedIdeaList) {
            setIdeaList(data.result.bookmarkedIdeaList)
        }
    }, [data])

    const handleDeleteIdea = (title: string) => {
        setIdeaList((prev) => prev.filter((item) => item.title !== title))
    }

    return (
        <>
            <div className="flex">
                <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px]">
                    {ideaList.length}개의 스크랩
                </p>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-1 gap-6">
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : (
                    currentItems.map((item) => (
                        <IdeaCard key={item.ideaId} item={item} onDelete={() => handleDeleteIdea(item.title)} />
                    ))
                )}
            </div>

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    key={`idea-${ideaPage}`}
                    totalItems={Math.max(1, ideaList.length)} //최소 1개 보장
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

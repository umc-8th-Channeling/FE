import { useEffect, useState } from 'react'
import Pagination from '../../../components/Pagination'
import IdeaCard from './IdeaCard'
import type { IdeaItem } from '../../../types/library'
import { DUMMY_IDEA } from '../dummy'

export default function IdeaTab() {
    const [ideaList, setIdeaList] = useState<IdeaItem[]>(DUMMY_IDEA)
    const [ideaPage, setIdeaPage] = useState(1)

    const itemsPerPage = 6
    const offset = (ideaPage - 1) * itemsPerPage
    const currentItems = ideaList.slice(offset, offset + itemsPerPage)

    const emptyCount = itemsPerPage - currentItems.length

    const handleDeleteIdea = (title: string) => {
        setIdeaList((prev) => prev.filter((item) => item.title !== title))
    }

    useEffect(() => {
        const totalPages = Math.ceil(ideaList.length / itemsPerPage)
        if (ideaPage > totalPages && totalPages > 0) {
            setIdeaPage(totalPages)
        }
    }, [ideaList.length, itemsPerPage, ideaPage])

    return (
        <>
            <div className="flex">
                <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px]">
                    {ideaList.length}개의 스크랩
                </p>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-1 gap-6">
                {currentItems.map((item) => (
                    <IdeaCard key={item.title} item={item} onDelete={() => handleDeleteIdea(item.title)} />
                ))}

                {Array.from({ length: emptyCount }).map((_, i) => (
                    <div
                        key={`empty-idea-${i}`}
                        className="w-full h-[141px] rounded-[8px] bg-transparent"
                        aria-hidden
                    ></div>
                ))}
            </div>

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    key={`idea-${ideaPage}`}
                    totalItems={Math.max(1, ideaList.length)} //최소 1개 보장
                    itemCountPerPage={itemsPerPage}
                    currentPage={ideaPage}
                    onChangePage={setIdeaPage}
                />
            </div>
        </>
    )
}

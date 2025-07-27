import { useEffect, useState } from 'react'
import ChevronLeft from '../assets/icons/chevron_left.svg?react'
import ChevronRight from '../assets/icons/chevron_right.svg?react'

interface PagingProps {
    totalItems: number //데이터 총 개수
    itemCountPerPage: number //페이지당 보여줄 아이템 개수
    currentPage: number //현재 페이지
    onChangePage: (page: number) => void
}

const Pagination = ({ totalItems, itemCountPerPage, currentPage, onChangePage }: PagingProps) => {
    const [startPage, setStartPage] = useState(1) // 페이지 번호 시작하는 값

    const totalPageCount = Math.ceil(totalItems / itemCountPerPage) // 총 페이지 수 계산
    const visiblePages = Array.from({ length: Math.min(5, totalPageCount - startPage + 1) }, (_, i) => startPage + i) // 하단에 보이는 페이지
    const noNext = startPage + 5 > totalPageCount
    const noPrev = startPage == 1

    useEffect(() => {
        if (currentPage >= startPage + 5 && !noNext) setStartPage(currentPage)
        else if (currentPage <= startPage - 1 && !noPrev) setStartPage(currentPage - 4)
    }, [noPrev, noNext, startPage, currentPage])

    return (
        <div className="flex items-center gap-[16px]">
            <ChevronLeft
                onClick={() => {
                    if (noPrev) return
                    onChangePage(startPage - 1)
                }}
                className={`cursor-pointer ${noPrev ? 'text-gray-600' : 'text-primary-500'}`}
                aria-disabled={noPrev ? true : false}
            />
            <div className="flex items-start content-start gap-x-[8px] flex-wrap">
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={`flex flex-col w-[36px] h-[36px] justify-center items-center gap-[8px] rounded-[12px] text-gray-900 font-medium text-[16px] cursor-pointer ${
                            page == currentPage ? 'bg-primary-500' : 'bg-transparent  hover:bg-primary-opacity50'
                        }`}
                        onClick={() => {
                            onChangePage(page)
                        }}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <ChevronRight
                onClick={() => {
                    if (noNext) return
                    if (startPage + 5 <= totalPageCount) onChangePage(startPage + 5)
                }}
                className={`cursor-pointer ${noNext ? 'text-gray-600' : 'text-primary-500'}`}
                aria-disabled={noNext ? true : false}
            />
        </div>
    )
}
export default Pagination

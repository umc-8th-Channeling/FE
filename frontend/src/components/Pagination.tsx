import { useState } from 'react'
import Chevron_left from '../assets/icons/chevron_left.svg?react'
import Chevron_right from '../assets/icons/chevron_right.svg?react'

const Pagination = ({ totalItems, itemCountPerPage }: PagingProps) => {
    const [startPage, setStartPage] = useState(1) // 페이지 번호 시작하는 값
    const [nowPage, setNowPage] = useState(1) //현재 페이지 값

    const totalPageCount = totalItems / itemCountPerPage
    const visiblePages = Array.from({ length: 5 }, (_, i) => startPage + i)

    return (
        <div className="flex items-center gap-[16px]">
            <Chevron_left
                onClick={() => {
                    if (startPage > 5) setStartPage(startPage - 5)
                }}
            />
            <div className="flex items-start content-start gap-x-[8px] flex-wrap">
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={`flex flex-col w-[36px] h-[36px] justify-center items-center gap-[8px] rounded-[12px]  text-gray-900 font-medium text-[16px] hover:bg-primary-opacity50 ${
                            page <= nowPage ? 'bg-primary-500' : ''
                        }`}
                        onClick={() => setNowPage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <Chevron_right
                onClick={() => {
                    if (startPage + 5 <= totalPageCount) setStartPage(startPage + 5)
                }}
            />
        </div>
    )
}
export default Pagination

interface PagingProps {
    totalItems: number //데이터 총 개수
    itemCountPerPage: number //페이지당 보여줄 아이템 개수
    // totalPageCount: number; //보여줄 페이지 총 개수
    // currentPage: number; //현재 페이지
}

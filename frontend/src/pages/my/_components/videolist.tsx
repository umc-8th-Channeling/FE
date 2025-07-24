import { useState } from 'react'
import MyVideoCard from './myVideoCard'
import MyShortsCard from './myShortsCard'
import Pagination from '../../../components/Pagination'
import { shortsData, videosData } from '../dummy'

export default function Videolist() {
    const [videoCurrentPage, setVideoCurrentPage] = useState(1)
    const [shortsCurrentPage, setShortsCurrentPage] = useState(1)
    const itemsPerPage = 12 // 페이지당 보여줄 아이템 개수
    const videoTotalItems = videosData.length //동영상 총 개수
    const shortsTotalItems = shortsData.length //숏츠 총 개수

    const [activeTab, setActiveTab] = useState<'video' | 'shorts'>('video')

    const offset =
        activeTab === 'video' ? (videoCurrentPage - 1) * itemsPerPage : (shortsCurrentPage - 1) * itemsPerPage

    const data = activeTab === 'video' ? videosData : shortsData
    const currentItems = data.slice(offset, offset + itemsPerPage)

    return (
        <div className="flex flex-col w-full items-start content-start pb-[80px] gap-[16px]">
            <div className="self-stretch text-[#fff] text-[20px] font-bold leading-[140%] tracking-[-0.5px]">
                영상 리스트
            </div>
            <div className="flex items-center">
                <button
                    className={`flex justify-center items-center gap-[8px] px-[16px] py-[8px] text-[18px] font-bold leading-[140%] tracking-[-0.45px] whitespace-nowrap border-b-2 cursor-pointer ${
                        activeTab === 'video' ? 'text-primary-500 border-primary-500' : 'text-[#fff] border-transparent'
                    }`}
                    onClick={() => setActiveTab('video')}
                >
                    동영상
                </button>
                <button
                    className={`px-[16px] py-[8px] text-[18px] font-bold leading-[140%] tracking-[-0.45px] flex justify-center items-center border-b-2 cursor-pointer ${
                        activeTab === 'shorts'
                            ? 'text-primary-500 border-primary-500'
                            : 'text-[#fff] border-transparent'
                    } transition-colors duration-300`}
                    onClick={() => setActiveTab('shorts')}
                >
                    Shorts
                </button>
            </div>
            {activeTab === 'video' && (
                <div className="grid grid-cols-2 desktop:grid-cols-4 w-full desktop:min-h-[744px] min-h-[1560px] self-stretch gap-4 tablet:gap-6 cursor-pointer">
                    {currentItems.map((video) => (
                        <MyVideoCard video={video} key={video.id} />
                    ))}
                </div>
            )}
            {activeTab === 'shorts' && (
                <div className="grid grid-cols-3 desktop:grid-cols-6 w-full desktop:min-h-[766px] min-h-[1556px] self-stretch desktop:gap-x-4 gap-x-[9px] gap-y-6 cursor-pointer">
                    {currentItems.map((short) => (
                        <MyShortsCard shorts={short} key={short.id} />
                    ))}
                </div>
            )}

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    totalItems={activeTab === 'video' ? videoTotalItems : shortsTotalItems}
                    itemCountPerPage={itemsPerPage}
                    currentPage={activeTab === 'video' ? videoCurrentPage : shortsCurrentPage}
                    onChangePage={activeTab === 'video' ? setVideoCurrentPage : setShortsCurrentPage}
                />
            </div>
        </div>
    )
}

import { useState } from 'react'
import MyVideoCard from './myVideoCard'
import MyShortsCard from './myShortsCard'
import Pagination from '../../../components/Pagination'
import { shortsData, videosData } from '../dummy'
import { useGetChannelVideo } from '../../../hooks/queries/useGetChannelVideo'
import { useParams } from 'react-router-dom'
import { mapResponseToVideoList } from '../../../mappers/profile.ts/mapResponseToVideo'

export default function Videolist() {
    const { channelId } = useParams()

    const [videoCurrentPage, setVideoCurrentPage] = useState(1)
    const [shortsCurrentPage, setShortsCurrentPage] = useState(1)

    const [activeTab, setActiveTab] = useState<'video' | 'shorts'>('video')

    const {
        data: videoResponse,
        isPending: isVideoPending,
        isError: isVideoError,
    } = useGetChannelVideo({ channelId: Number(channelId), type: 'LONG' })
    const {
        data: shortsResponse,
        isPending: isShortsPending,
        isError: isShortsError,
    } = useGetChannelVideo({ channelId: Number(channelId), type: 'SHORT' })

    if (isVideoPending) return <div>로딩 중</div>
    if (isShortsPending) return <div>로딩 중</div>
    if (isVideoError) return <div>에러</div>
    if (isShortsError) return <div>에러</div>

    const videosData = videoResponse ? mapResponseToVideoList(videoResponse) : []
    const shortsData = shortsResponse ? mapResponseToVideoList(shortsResponse) : []

    const itemsPerPage = 12 // 페이지당 보여줄 아이템 개수
    const videoTotalItems = videosData.length //동영상 총 개수
    const shortsTotalItems = shortsData.length //숏츠 총 개수
    const offset =
        activeTab === 'video' ? (videoCurrentPage - 1) * itemsPerPage : (shortsCurrentPage - 1) * itemsPerPage

    const data = activeTab === 'video' ? videosData : shortsData
    const currentItems = data.slice(offset, offset + itemsPerPage)

    const currentLength = currentItems.length
    const emptyCount = itemsPerPage - currentLength

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
                    {Array.from({ length: emptyCount }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="flex flex-col h-fit items-center gap-[8px] w-full"
                            aria-hidden // 접근성: 스크린리더 무시
                        >
                            <div className="w-full aspect-[141/79] shrink-0 rounded-[8px] bg-transparent" />
                            <div className="w-full flex flex-col h-[78px] items-start gap-[4px]">
                                <div className="self-stretch text-transparent text-[16px] tablet:text-[18px] font-bold leading-[140%] tracking-[-0.45px]"></div>
                                <div className="self-stretch text-transparent text-[12px] tablet:text-[14px] font-normal leading-[140%] tracking-[-0.35px]">
                                    -
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'shorts' && (
                <div className="grid grid-cols-3 desktop:grid-cols-6 w-full desktop:min-h-[766px] min-h-[1556px] self-stretch desktop:gap-x-4 gap-x-[9px] gap-y-6 cursor-pointer">
                    {currentItems.map((short) => (
                        <MyShortsCard shorts={short} key={short.id} />
                    ))}
                    {Array.from({ length: emptyCount }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="flex flex-col h-fit items-center tablet:gap-x-[9px] desktop:gap-[8px] shrink-0"
                            aria-hidden
                        >
                            <div className="w-full aspect-[192/289] rounded-[8px]"></div>
                            <div className="w-full gap-1 mt-[8px] h-[74px] items-start">
                                <div className=" text-transparent text-[16px] tablet:text-[18px] font-bold leading-[140%] tracking-[-0.45px] "></div>
                                <div className=" text-transparent text-[12px] tablet:text-[14px] font-normal leading-[140%] tracking-[-0.35px]"></div>
                            </div>
                        </div>
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

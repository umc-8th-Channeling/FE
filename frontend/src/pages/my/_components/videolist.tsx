import { useState } from 'react'
import MyVideoCard from './myVideoCard'
import MyShortsCard from './myShortsCard'
import Pagination from '../../../components/Pagination'
import { useGetChannelVideo } from '../../../hooks/my/useGetChannelVideo'
import { mapResponseToVideoList } from '../../../lib/mappers/profile/mapResponseToVideo'
import { useAuthStore } from '../../../stores/authStore'
import { VideoSkeleton } from './Skeleton/VideoSkeleton'

export default function Videolist() {
    const [videoCurrentPage, setVideoCurrentPage] = useState(1) //현재 페이지 값
    const [shortsCurrentPage, setShortsCurrentPage] = useState(1)

    const [videoStartPage, setVideoStartPage] = useState(1) //가장 앞 페이지 값
    const [ShortsStartPage, setShortsStartPage] = useState(1)
    const itemsPerPage = 12 // 페이지당 보여줄 아이템 개수
    const [activeTab, setActiveTab] = useState<'video' | 'shorts'>('video')

    const user = useAuthStore((state) => state.user)
    const channelId = Number(user?.channelId)

    const {
        data: videoResponse,
        isPending: isVideoPending,
        isError: isVideoError,
    } = useGetChannelVideo({
        channelId: channelId,
        type: 'LONG',
        page: videoCurrentPage,
        size: itemsPerPage,
    })
    const {
        data: shortsResponse,
        isPending: isShortsPending,
        isError: isShortsError,
    } = useGetChannelVideo({
        channelId: channelId,
        type: 'SHORTS',
        page: shortsCurrentPage,
        size: itemsPerPage,
    })

    const videosData = videoResponse ? mapResponseToVideoList(videoResponse) : []
    const videoTotalItems = videoResponse?.result.totalElements ?? 0
    const shortsData = shortsResponse ? mapResponseToVideoList(shortsResponse) : []
    const shortsTotalItems = shortsResponse?.result.totalElements ?? 0
    //비디오 - 숏츠 탭
    const data = activeTab === 'video' ? videosData : shortsData

    if (isVideoPending || isShortsPending) return <VideoSkeleton />
    if (isVideoError || isShortsError) return <div>에러</div>

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
                <div className="grid grid-cols-2 desktop:grid-cols-4 w-full self-stretch gap-4 tablet:gap-6 cursor-pointer">
                    {data.map((video) => (
                        <MyVideoCard video={video} key={video.id} />
                    ))}
                </div>
            )}
            {activeTab === 'shorts' && (
                <div className="grid grid-cols-3 desktop:grid-cols-6 w-full  self-stretch desktop:gap-x-4 gap-x-[9px] gap-y-6 cursor-pointer">
                    {data.map((short) => (
                        <MyShortsCard shorts={short} key={short.id} />
                    ))}
                </div>
            )}

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    totalItems={activeTab === 'video' ? videoTotalItems : shortsTotalItems}
                    itemCountPerPage={itemsPerPage}
                    currentPage={activeTab === 'video' ? videoCurrentPage : shortsCurrentPage}
                    startPage={activeTab === 'video' ? videoStartPage : ShortsStartPage}
                    setStartPage={activeTab === 'video' ? setVideoStartPage : setShortsStartPage}
                    onChangePage={activeTab === 'video' ? setVideoCurrentPage : setShortsCurrentPage}
                />
            </div>
        </div>
    )
}

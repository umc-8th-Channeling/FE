import ProfileCard from './_components/profileCard'
import { type Stats } from './profile'

const profileData = {
    imageUrl: 'https://placekitten.com/200/200',
    category: 'People & Vlog',
    channelName: '찰스엔터',
    channelUrl: 'https://youtube.com/@찰스엔터',
    joinDate: '2025. 6. 29.',
}

import StatsCard from './_components/statsCard'
import Targetbox from './_components/targetbox'

const statsMeta = [
    { key: 'views', title: '조회수' },
    { key: 'likes', title: '좋아요' },
    { key: 'subscribers', title: '구독자' },
    { key: 'shares', title: '공유' },
    { key: 'videos', title: '영상 수' },
    { key: 'comments', title: '댓글' },
] as const

// 받아온 API 데이터 예시
const stats: Stats = {
    views: 20000000,
    likes: 1200,
    subscribers: 1200,
    shares: 1200,
    videos: 10,
    comments: 400,
}

export default function Mypage() {
    return (
        <div className="flex bg-surface-base">
            <div className=" mt-[8px] ml-[80px] bg-gray-50 w-[1352px] h-[1401px] rounded-[8px]">
                <div className="gap-[24px] ml-[76px] mt-[80px]">
                    <div className="flex">
                        <ProfileCard profile={profileData} />
                        <div className="w-[588px] h-[220px] grid grid-cols-3 gap-[24px] ">
                            {statsMeta.map((meta) => (
                                <StatsCard key={meta.key} title={meta.title} value={stats[meta.key]} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-[1200px] h-[336px] gap-[40px]">
                    <Targetbox />
                </div>
            </div>
        </div>
    )
}

import ProfileCard from './_components/profileCard'
import { type Stats } from './profile'
import StatsCard from './_components/statsCard'
import Targetbox from './_components/targetbox'
import Conceptbox from './_components/conceptbox'
import Videolist from './_components/videolist'
import View from '../../assets/icons/view.svg?react'
import Like from '../../assets/icons/like.svg?react'
import People from '../../assets/icons/people.svg?react'
import Share from '../../assets/icons/share.svg?react'
import Videos from '../../assets/icons/videos.svg?react'
import Comment from '../../assets/icons/comment.svg?react'

const profileData = {
    imageUrl: 'https://placekitten.com/200/200',
    category: 'People & Vlog',
    channelName: '찰스엔터',
    channelUrl: 'https://youtube.com/@찰스엔터',
    joinDate: '2025. 6. 29.',
}

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

const statIcons = {
    views: <View />,
    likes: <Like />,
    subscribers: <People />,
    shares: <Share />,
    videos: <Videos />,
    comments: <Comment />,
}

export default function Mypage() {
    return (
        <div className="flex bg-surface-base">
            <div className=" mt-[8px] ml-[80px] w-[1352px] h-[1401px] rounded-[8px]">
                <div className="flex gap-[24px] ml-[76px] mt-[80px]">
                    <ProfileCard profile={profileData} />
                    <div className="w-[588px] h-[220px] grid grid-cols-3 gap-[24px] ">
                        {statsMeta.map((meta) => (
                            <StatsCard
                                key={meta.key}
                                title={meta.title}
                                value={stats[meta.key]}
                                icon={statIcons[meta.key]}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-[1200px] h-[336px] mt-[40px] ml-[76px]">
                    <Targetbox />
                    <Conceptbox />
                </div>
                <div className="mt-[40px] ml-[76px]">
                    <Videolist />
                </div>
            </div>
        </div>
    )
}

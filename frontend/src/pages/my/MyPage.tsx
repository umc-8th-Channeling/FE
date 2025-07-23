import ProfileCard from './_components/profileCard'
import { type Stats } from '../../types/profile'
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
import { formatKoreanNumber } from '../../utils/format'

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
        <div className="w-full desktop:px-[76px] px-6 tablet:px-[90px] desktop:pt-[80px] pt-[40px] ">
            <div className="flex flex-col w-full gap-[40px] items-start ">
                <div className="flex flex-col desktop:flex-row w-full justify-between items-start space-y-6 ">
                    <div className="flex w-full items-center">
                        <ProfileCard profile={profileData} />
                    </div>
                    <div className="grid grid-cols-3 gap-3 tablet:gap-6 w-full">
                        {statsMeta.map((meta) => (
                            <StatsCard
                                key={meta.key}
                                title={meta.title}
                                value={formatKoreanNumber(stats[meta.key])}
                                icon={statIcons[meta.key]}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full items-start">
                    <Targetbox />
                    <Conceptbox />
                </div>
                <div className="flex items-start content-start self-stretch flex-wrap">
                    <Videolist />
                </div>
            </div>
        </div>
    )
}

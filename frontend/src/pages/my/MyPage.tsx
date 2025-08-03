import ProfileCard from './_components/profileCard'
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
import { useParams } from 'react-router-dom'
import { useGetChannel } from '../../hooks/my/useGetChannel'
import { mapResponseToProfile } from '../../lib/mappers/profile/mapResponseToProfile'
import { mapResponseStatCard } from '../../lib/mappers/profile/mapResponsetoStatCard'
import { useEffect } from 'react'
import { setMockLogin } from '../../utils/loginMock'
import { Skeleton } from './_components/Skeleton'

const statsMeta = [
    { key: 'views', title: '조회수' },
    { key: 'likes', title: '좋아요' },
    { key: 'subscribers', title: '구독자' },
    { key: 'shares', title: '공유' },
    { key: 'videos', title: '영상 수' },
    { key: 'comments', title: '댓글' },
] as const

const statIcons = {
    views: <View />,
    likes: <Like />,
    subscribers: <People />,
    shares: <Share />,
    videos: <Videos />,
    comments: <Comment />,
}

export default function Mypage() {
    const { channelId } = useParams()
    const { data, isPending: isMePending, isError: isMeError } = useGetChannel({ channelId: Number(channelId) })

    useEffect(() => {
        localStorage.removeItem('loginMember')
        localStorage.removeItem('accessToken')
        setMockLogin()
    }, [])
    if (isMePending)
        return (
            <div>
                <Skeleton />
            </div>
        )
    if (isMeError) return <div></div>

    const profile = data ? mapResponseToProfile(data) : null
    const stats = data ? mapResponseStatCard(data) : null
    return (
        <>
            <div className="w-full desktop:px-[76px] px-6 tablet:px-[90px] desktop:pt-[80px] pt-[40px] ">
                <div className="flex flex-col w-full gap-[40px] items-start ">
                    <div className="flex flex-col desktop:flex-row w-full justify-between items-start space-y-6 ">
                        <div className="flex w-full items-center">{profile && <ProfileCard profile={profile} />}</div>
                        {stats && (
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
                        )}
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
        </>
    )
}

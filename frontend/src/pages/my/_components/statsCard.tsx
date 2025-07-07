import { type Stats } from '../profile'

interface StatsCardProps {
    title: string
    value: string | number
}
const statsData = [
    { title: '조회수', value: '2000만' },
    { title: '좋아요', value: '1,200' },
    { title: '구독자', value: '1,200' },
    { title: '공유', value: '1,200' },
    { title: '영상 수', value: '10' },
    { title: '댓글', value: '400' },
]

const stats: Stats = {
    views: 20000000,
    likes: 1200,
    subscribers: 1200,
    shares: 1200,
    videos: 10,
    comments: 400,
}

const StatsCard = ({ title, value }: StatsCardProps) => (
    <div className="w-[180px] h-[98px] bg-[#262626] rounded-[8px] p-4 flex flex-col justify-between border border-gray-200">
        <div className="flex items-center gap-2 text-gray-600 text-[14px]">{title}</div>
        <div className="text-gray-900 text-[24px] font-bold">{value}</div>
    </div>
)

export default StatsCard

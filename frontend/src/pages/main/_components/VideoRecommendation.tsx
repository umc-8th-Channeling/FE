import type { RecommededVideos } from '../../../types/main'
import { VideoCard } from './VideoCard'

interface VideoRecommendationProps {
    label: string
    videoData: RecommededVideos
}

export const VideoRecommendation = ({ label, videoData }: VideoRecommendationProps) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-row items-center gap-2">
                <span className="px-2 py-1 rounded-2xl border border-gray-900 text-[16px] leading-[150%] tracking-[-0.4px]">
                    Report
                </span>
                <h2 className="text-[18px] leading-[140%] font-bold tracking-[-0.45px] tablet:text-[20px] tablet:tracking-[-0.5px]">
                    {label}
                </h2>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 place-items-start">
                {videoData.list.map((video) => (
                    <VideoCard key={video.videoId} video={video} />
                ))}
            </div>
        </div>
    )
}

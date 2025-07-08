import { DUMMY_MY } from '../dummy'
import { VideoCard } from './VideoCard'

interface VideoRecommendationProps {
    label: string
    videos: typeof DUMMY_MY
}

export const VideoRecommendation = ({ label, videos }: VideoRecommendationProps) => {
    return (
        <div className="space-y-4">
            <h2 className="text-[18px] leading-[140%] font-bold tracking-[-0.45px] tablet:text-[20px] tablet:tracking-[-0.5px]">
                {label}
            </h2>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    )
}

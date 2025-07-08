import type { DUMMY_MY } from '../dummy'
import { formatRelativeTime, formatViewCount } from '../../../utils/format'

interface VideoCardProps {
    video: (typeof DUMMY_MY)[0] // 임시
}

export const VideoCard = ({ video }: VideoCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 w-[288px] tablet:w-[282px]">
            {/* 영상 썸네일 이미지 */}
            <div className="w-[288px] aspect-[16/9] tablet:w-[282px] tablet:aspect-[141/79] rounded-lg overflow-hidden">
                <img src={video.thumbnail} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-row w-full gap-2">
                {/* 채널 프로필 이미지 */}
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img src={video.channelProfile} className="w-full h-full object-cover" />
                </div>

                {/* 영상 메타 데이터 */}
                <div className="space-y-1">
                    <h3 className="text-[16px] leading-[140%] font-bold tracking-[-0.4px] tablet:text-[18px] tablet:tracking-[-0.45px]">
                        {video.title}
                    </h3>
                    <div className="flex flex-row gap-1 whitespace-nowrap text-[12px] leading-[140%] tracking-[-0.3px] tablet:text-[14px] tablet:tracking-[-0.35px] text-gray-600">
                        <p>{video.channelTitle}</p>
                        <span>·</span>
                        <p>조회수 {formatViewCount(video.viewCount)}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(video.publishedAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

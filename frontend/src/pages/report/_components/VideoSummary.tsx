import { formatKoreanDate, formatRelativeTime } from '../../../utils/format'
import { type VIDEO } from '../dummy'
import { Tag } from './Tag'

export const VideoSummary = ({ video }: { video: typeof VIDEO }) => {
    return (
        <div className="flex flex-col tablet:flex-row gap-6">
            <iframe
                id="ytplayer"
                width="480"
                height="270"
                src={`https://www.youtube.com/embed/${video.videoId}?controls=0&rel=0&origin=http://localhost:5173`}
                className="w-[282px] h-full aspect-[141/79] rounded-lg"
            />

            <div className="space-y-2">
                <Tag text={video.tag} />
                <div>
                    <h3 className="text-[24px] font-bold leading-[140%] tracking-[-0.6px]">{video.title}</h3>
                    <p className="text-[14px] tablet:text-[16px] font-medium leading-[150%] tracking-[-0.4px]">
                        업데이트: {formatKoreanDate(video.report.updatedAt)}
                    </p>
                    <div className="flex flex-row gap-1 whitespace-nowrap text-[14px] tablet:text-[16px] leading-[150%] tracking-[-0.4px] text-gray-600">
                        <p>{video.channel.title}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(video.publishedAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

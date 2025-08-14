import { memo } from 'react'
import { formatKoreanDate, formatRelativeTime } from '../../../utils/format'
import { Tag } from './Tag'
import type { VideoData } from '../../../types/report/all'

export const VideoSummary = memo(({ data }: { data: VideoData | undefined }) => {
    return (
        <div className="flex flex-col tablet:flex-row gap-6">
            <iframe
                id="ytplayer"
                width="480"
                height="270"
                src={`https://www.youtube.com/embed/${data?.youtubeVideoId}?controls=0&rel=0&origin=http://localhost:5173`}
                className="w-[282px] h-full aspect-[141/79] rounded-lg"
            />

            <div className="space-y-2">
                <Tag text={data?.videoCategory || 'NONE'} />
                <div>
                    <h3 className="max-h-[68px] line-clamp-2 text-[24px] font-bold leading-[140%] tracking-[-0.6px]">
                        {data?.videoTitle || '제목 불러오는 중...'}
                    </h3>
                    <p className="text-[14px] tablet:text-[16px] font-medium leading-[150%] tracking-[-0.4px]">
                        업데이트: {formatKoreanDate(data?.lastUpdatedDate || new Date())}
                    </p>
                    <div className="flex flex-row gap-1 whitespace-nowrap text-[14px] tablet:text-[16px] leading-[150%] tracking-[-0.4px] text-gray-600">
                        <p>{data?.ChannelName || '채널 정보 불러오는 중...'}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(data?.videoCreatedDate || new Date())}</p>
                    </div>
                </div>
            </div>
        </div>
    )
})

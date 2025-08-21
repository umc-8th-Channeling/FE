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
                src={`https://www.youtube.com/embed/${data?.youtubeVideoId}?controls=0&rel=0&origin=http://channeling.it.com`}
                className="w-[282px] h-full aspect-[141/79] rounded-lg"
            />

            <div className="space-y-2">
                <Tag text={data?.videoCategory || 'LOADING...'} />
                <div>
                    <h3 className="max-h-[68px] line-clamp-2 font-title-24b">
                        {data?.videoTitle || '제목 불러오는 중...'}
                    </h3>
                    <p className="font-body-16m">업데이트: {formatKoreanDate(data?.lastUpdatedDate || new Date())}</p>
                    <div className="flex flex-row gap-1 whitespace-nowrap font-body-16r text-gray-600">
                        <p>{data?.ChannelName || '채널 정보 불러오는 중...'}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(data?.videoCreatedDate || new Date())}</p>
                    </div>
                </div>
            </div>
        </div>
    )
})

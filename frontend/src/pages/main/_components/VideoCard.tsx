import { useState } from 'react'
import { formatRelativeTime, formatKoreanNumber } from '../../../utils/format'
import type { BriefVideo } from '../../../types/main'
import { MyReportModal } from '../../my/_components/myReportModal'

interface VideoCardProps {
    video: BriefVideo
}

export const VideoCard = ({ video }: VideoCardProps) => {
    const [open, setOpen] = useState(false)

    const handleVideoClick = () => setOpen(true)

    return (
        <div
            onClick={handleVideoClick}
            className="flex flex-col items-center justify-center gap-2 w-[288px] tablet:w-[282px] cursor-pointer"
        >
            {/* 영상 썸네일 이미지 */}
            <div className="w-[288px] aspect-[16/9] tablet:w-[282px] tablet:aspect-[141/79] rounded-lg overflow-hidden">
                <img src={video.videoThumbnailUrl} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-row w-full gap-2">
                {/* 채널 프로필 이미지 */}
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img src={video.channelImage} className="w-full h-full object-cover" />
                </div>

                {/* 영상 메타 데이터 */}
                <div className="space-y-1">
                    <h3 className="max-h-[50px] line-clamp-2 text-[16px] leading-[140%] font-bold tracking-[-0.4px] tablet:text-[18px] tablet:tracking-[-0.45px]">
                        {video.videoTitle}
                    </h3>
                    <div className="flex flex-row gap-1 whitespace-nowrap text-[12px] leading-[140%] tracking-[-0.3px] tablet:text-[14px] tablet:tracking-[-0.35px] text-gray-600">
                        <p>{video.channelName}</p>
                        <span>·</span>
                        <p>조회수 {formatKoreanNumber(video.viewCount, '회')}</p>
                        <span>·</span>
                        <p>{formatRelativeTime(video.uploadDate)}</p>
                    </div>
                </div>
            </div>

            {open && <MyReportModal videoId={video.videoId} title={video.videoTitle} setOpen={setOpen} />}
        </div>
    )
}

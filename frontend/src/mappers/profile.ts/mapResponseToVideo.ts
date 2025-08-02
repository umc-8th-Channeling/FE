import type { ChannelVideoDto, ResponseChannelVideoDto, Video } from '../../types/profile'

export function mapResponseToVideoItem(video: ChannelVideoDto): Video {
    return {
        id: video.videoId,
        thumbnailUrl: video.videoThumbnailUrl,
        title: video.videoTitle,
        viewCount: video.viewCount,
        publishedAt: video.uploadDate,
    }
}

export function mapResponseToVideoList(dto: ResponseChannelVideoDto): Video[] {
    if (!dto.result?.videoList) return []

    return dto.result.videoList.map(mapResponseToVideoItem)
}

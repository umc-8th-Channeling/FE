import type { Stats, ResponseChannelDto } from '../../../types/profile'

export function mapResponseStatCard(dto: ResponseChannelDto): Stats {
    return {
        views: dto.result.view,
        likes: dto.result.likeCount,
        subscribers: dto.result.subscribe,
        shares: dto.result.share,
        videos: dto.result.videoCount,
        comments: dto.result.comment,
    }
}

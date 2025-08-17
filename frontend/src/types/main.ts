import type { CommonResponse } from './common'

export type RecommendedVideosDto = {
    channelId: number | undefined
    page?: number
    size?: number
}

export type BriefVideo = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    channelName: string
    channelImage: string
    uploadDate: Date
}

export type RecommededVideos = {
    list: BriefVideo[]
    listSize: number
    totalPage: number
    totalElements: number
    isFirst: boolean
    isLast: boolean
}

export type ResponseRecommededVideos = CommonResponse<RecommededVideos>

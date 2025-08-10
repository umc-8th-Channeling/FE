import type { CommonResponse } from './common'

export interface Profile {
    imageUrl: string
    category: string
    channelName: string
    channelUrl: string
    joinDate: string
}

export interface Stats {
    views: number
    likes: number
    subscribers: number
    shares: number
    videos: number
    comments: number
}

export interface Target {
    target: string
}

export interface Video {
    id: number
    thumbnailUrl: string
    title: string
    viewCount: number
    publishedAt: Date
}

export type RequestChannelDto = {
    channelId: number
}

export type ResponseChannelDto = CommonResponse<ChannelDto>

export type ChannelDto = {
    channelId: number
    name: string
    view: number
    likeCount: number
    subscribe: number
    share: number
    videoCount: number
    comment: number
    link: string
    joinDate: Date
    target: string
    concept: string
    image: string
    channelHashTags: string
    channelUpdateAt: Date
}
export type RequestChannelVideoDto = {
    channelId: number
    type: 'LONG' | 'SHORT'
}

export type ResponseChannelVideoDto = CommonResponse<ChannelVideoListDto>

export type ChannelVideoListDto = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    videoList: [
        {
            videoId: number
            videoTitle: string
            videoThumbnailUrl: string
            videoCategory: string
            viewCount: number
            uploadDate: Date
        }
    ]
}

export type ChannelVideoDto = NonNullable<ResponseChannelVideoDto['result']>['videoList'][number]

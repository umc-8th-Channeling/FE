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

export interface Video {
    id: string
    thumbnailUrl: string
    title: string
    viewCount: number
    publishedAt: string
}

// export interface Shorts {
//     id: string
//     thumbnailUrl: string
//     title: string
//     viewCount: number
//     publishedAt: string
// }

export type RequestChannelDto = {
    channelId: number
}

export type ResponseChannelDto = {
    isSuccess: boolean
    code: string
    message: string
    result: {
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
}
export type RequestChannelVideoDto = {
    channelId: number
    type: 'LONG' | 'SHORT'
}

export type ResponseChannelVideoDto = {
    isSuccess: boolean
    code: string
    message: string
    result: {
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
}

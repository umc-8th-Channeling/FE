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

export interface Shorts {
    id: string
    thumbnailUrl: string
    title: string
    viewCount: number
    publishedAt: string
}

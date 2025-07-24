export type ReportVideoSummary = {
    id: number
    title: string
    videoId: string
    thumbnail: string
    tag: string
    channel: {
        id: number
        title: string
        profileImage: string
    }
    viewCount: number
    likeCount: number
    publishedAt: string
    report: {
        createdAt: string
        updatedAt: string
    }
}

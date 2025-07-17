export interface LibraryItem {
    id: number
    title: string
    thumbnail: string
    channel: string
    updatedAt: string
    views: number
    daysAgo: number
}
export interface ScrapItem {
    title: string
    description: string
    hashtags: string[]
}

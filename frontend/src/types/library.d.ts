export interface LibraryItem {
    id: number;
    title: string;
    thumbnail: string;
    channel: string;
    daysAgo: number;
}

export interface ScrapItem {
    title: string;
    description: string;
    hashtags: string[];
}

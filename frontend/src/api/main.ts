import { axiosInstance } from './axios'
import type { RecommendedVideosDto, ResponseRecommededVideos } from '../types/main'

export const getRecommededVideos = async ({ channelId }: RecommendedVideosDto): Promise<ResponseRecommededVideos> => {
    const { data } = await axiosInstance.get(`channels/${channelId}/recommended-videos`)
    return data
}

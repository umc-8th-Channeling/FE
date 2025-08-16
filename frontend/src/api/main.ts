import { axiosInstance } from './axios'
import type { RecommendedVideosDto, ResponseRecommededVideos } from '../types/main'

export const getRecommededVideos = async ({
    channelId,
    page,
    size,
}: RecommendedVideosDto): Promise<ResponseRecommededVideos> => {
    const { data } = await axiosInstance.get(`channels/${channelId}/recommended-videos`, {
        params: { page, size },
    })
    return data
}

import { useQuery } from '@tanstack/react-query'
import { getRecommededVideos } from '../../api/main'
import type { RecommendedVideosDto } from '../../types/main'

export default function useGetRecommendedVideo({ channelId, page, size }: RecommendedVideosDto) {
    return useQuery({
        queryKey: ['recommendedVideos', channelId, page, size],
        queryFn: () => getRecommededVideos({ channelId, page, size }),
        enabled: !!channelId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        select: (data) => data.result,
    })
}

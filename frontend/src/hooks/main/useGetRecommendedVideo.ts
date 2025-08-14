import { useQuery } from '@tanstack/react-query'
import { getRecommededVideos } from '../../api/main'
import type { RecommendedVideosDto } from '../../types/main'

export default function useGetRecommendedVideo({ channelId }: RecommendedVideosDto) {
    return useQuery({
        queryKey: ['recommendedVideos', channelId],
        queryFn: () => getRecommededVideos({ channelId }),
        enabled: !!channelId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        select: (data) => data.result,
    })
}

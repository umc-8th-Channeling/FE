import { useQuery } from '@tanstack/react-query'
import { getChannelVideo } from '../../api/my'
import type { RequestChannelVideoDto } from '../../types/profile'

export function useGetChannelVideo(dto: RequestChannelVideoDto) {
    const { channelId, type, page = 1, size = 12 } = dto
    return useQuery({
        queryKey: ['channelVideo', channelId, type, page, size],
        queryFn: () => getChannelVideo({ channelId, type, page, size }),
        staleTime: 60 * 60 * 1000,
    })
}

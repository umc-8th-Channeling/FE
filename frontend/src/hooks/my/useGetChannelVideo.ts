import { useQuery } from '@tanstack/react-query'
import { getChannelVideo } from '../../api/my'
import type { RequestChannelVideoDto } from '../../types/profile'

export function useGetChannelVideo({ channelId, type }: RequestChannelVideoDto) {
    return useQuery({
        queryKey: [channelId, type],
        queryFn: () => getChannelVideo({ channelId, type }),
        staleTime: 60 * 60 * 1000,
    })
}

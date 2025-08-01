import { getChannelDetail } from '../../api/my'
import type { RequestChannelDto } from '../../types/profile'
import { useQuery } from '@tanstack/react-query'

export function useGetChannel({ channelId }: RequestChannelDto) {
    return useQuery({
        queryKey: [channelId],
        queryFn: () => getChannelDetail({ channelId }),
    })
}

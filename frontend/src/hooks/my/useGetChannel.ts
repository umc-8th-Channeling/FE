import { getChannelDetail } from '../../api/my'
import type { RequestChannelDto } from '../../types/profile'
import { useQuery } from '@tanstack/react-query'

export function useGetChannel({ channelId }: RequestChannelDto) {
    return useQuery({
        queryKey: [channelId],
        queryFn: () => getChannelDetail({ channelId }),
        enabled: typeof channelId === 'number' && Number.isFinite(channelId) && channelId > 0,
        // 채널 아이디가 없으면 호출 막힘
        staleTime: 60 * 60 * 1000,
    })
}

import { useQuery } from '@tanstack/react-query'
import { getVideoData } from '../../api/report'

export default function useGetVideoData(videoId: number | undefined) {
    return useQuery({
        queryKey: ['video', videoId],
        queryFn: () => getVideoData({ videoId }),
        enabled: !!videoId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

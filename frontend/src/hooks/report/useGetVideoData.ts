import { useQuery } from '@tanstack/react-query'
import { getVideoData } from '../../api/report'

export default function useGetVideoData(videoId: number | undefined) {
    return useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => {
            const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 5000))
            const dataPromise = getVideoData({ videoId })

            // 5초 지연과 데이터 페칭이 모두 끝날 때까지 기다림
            const [dataResult] = await Promise.all([dataPromise, minDelayPromise])

            return dataResult
        },
        enabled: !!videoId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

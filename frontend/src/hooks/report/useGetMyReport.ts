import { useQuery } from '@tanstack/react-query'
import type { MyReports, ResponseMyReports, VideoType } from '../../types/report/all'
import { getMyReports } from '../../api/report'

interface useMyReportsOptions {
    channelId: number | undefined
    type: VideoType
    page: number
    size: number
}

export const useGetMyReports = ({ channelId, type, page, size }: useMyReportsOptions) => {
    return useQuery<ResponseMyReports, Error, MyReports>({
        queryKey: ['my', 'report', channelId, type, page, size],
        queryFn: () => getMyReports({ channelId: channelId!, type, page, size }),
        enabled: typeof channelId === 'number',
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

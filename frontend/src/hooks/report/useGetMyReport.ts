import { useQuery } from '@tanstack/react-query'
import type { MyReports, MyReportsDto, ResponseMyReports } from '../../types/report/all'
import { getMyReports } from '../../api/report'

export const useGetMyReports = ({ channelId, type, page, size }: MyReportsDto) => {
    return useQuery<ResponseMyReports, Error, MyReports>({
        queryKey: ['my', 'report', channelId, type, page, size],
        queryFn: () => getMyReports({ channelId, type, page, size }),
        enabled: !!channelId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

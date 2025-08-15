import { useQuery } from '@tanstack/react-query'
import type { MyReports, MyReportsDto, ResponseMyReports } from '../../types/report/all'
import { getMyReports } from '../../api/report'

export const useGetMyReports = ({ channelId }: MyReportsDto) => {
    return useQuery<ResponseMyReports, Error, MyReports>({
        queryKey: ['my', 'report', channelId],
        queryFn: () => getMyReports({ channelId }),
        enabled: !!channelId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

import { useQuery } from '@tanstack/react-query'
import type { GetReportDto } from '../../types/report/all'
import { getReportOverview } from '../../api/report'

export default function useGetReportOverview({ reportId }: GetReportDto) {
    return useQuery({
        queryKey: ['reports', 'overview', reportId],
        queryFn: () => getReportOverview({ reportId }),
        enabled: !!reportId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

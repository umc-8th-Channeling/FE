import { useQuery } from '@tanstack/react-query'
import type { GetReportDto } from '../../types/report/all'
import { getReportAnalysis } from '../../api/report'

export default function useGetReportAnalysis({ reportId }: GetReportDto) {
    return useQuery({
        queryKey: ['reports', 'analysis', reportId],
        queryFn: () => getReportAnalysis({ reportId }),
        enabled: !!reportId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

import { useQuery } from '@tanstack/react-query'
import type { GetReportDto } from '../../types/report/all'
import { getReportIdea } from '../../api/report'

export default function useGetReportIdea({ reportId }: GetReportDto) {
    return useQuery({
        queryKey: ['reports', 'idea', reportId],
        queryFn: () => getReportIdea({ reportId }),
        enabled: !!reportId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

import { useQuery } from '@tanstack/react-query'
import { getReportAll } from '../../api/report'
import type { GetReportAllDto } from '../../types/report/all'

export default function useGetReportAll({ reportId }: GetReportAllDto) {
    return useQuery({
        queryKey: ['reports', reportId],
        queryFn: () => getReportAll({ reportId }),
        enabled: !!reportId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

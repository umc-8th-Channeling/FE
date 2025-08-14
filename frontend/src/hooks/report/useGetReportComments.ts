import { useQuery } from '@tanstack/react-query'
import { getReportComments } from '../../api/report'
import type { ReportCommentsDto } from '../../types/report/comment'

export default function useGetReportComments({ reportId, type }: ReportCommentsDto) {
    return useQuery({
        queryKey: ['report', 'comments', reportId, type],
        queryFn: () => getReportComments({ reportId, type }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

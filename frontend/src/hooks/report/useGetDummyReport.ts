import { useQuery } from '@tanstack/react-query'
import type { GetReportDto } from '../../types/report/all'
import { getDummyAnalysis, getDummyComments, getDummyIdea, getDummyOverview } from '../../api/dummy'
import type { ReportCommentsDto } from '../../types/report/comment'

export function useGetDummyOverview({ reportId, enabled }: GetReportDto & { enabled: boolean }) {
    return useQuery({
        queryKey: ['dummy', 'reports', 'overviews', reportId],
        queryFn: () => getDummyOverview({ reportId }),
        enabled: !!reportId && enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

export function useGetDummyAnalysis({ reportId, enabled }: GetReportDto & { enabled: boolean }) {
    return useQuery({
        queryKey: ['dummy', 'reports', 'analysis', reportId],
        queryFn: () => getDummyAnalysis({ reportId }),
        enabled: !!reportId && enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

export function useGetDummyIdea({ reportId, enabled }: GetReportDto & { enabled: boolean }) {
    return useQuery({
        queryKey: ['dummy', 'reports', 'ideas', reportId],
        queryFn: () => getDummyIdea({ reportId }),
        enabled: !!reportId && enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

export default function useGetDummyComments({ reportId, type, enabled }: ReportCommentsDto & { enabled: boolean }) {
    return useQuery({
        queryKey: ['dummy', 'report', 'comments', reportId, type],
        queryFn: () => getDummyComments({ reportId, type }),
        enabled: !!reportId && enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        select: (data) => data.result,
    })
}

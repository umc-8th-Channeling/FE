import { useQuery } from '@tanstack/react-query'
import type { ReportStatus, ResponseReportStatus, Status } from '../../types/report/new'
import { getReportStatus } from '../../api/report'
import { useReportStore } from '../../stores/reportStore'
import { useEffect } from 'react'
import { useDeleteMyReport } from './useDeleteMyReport'
import { useAuthStore } from '../../stores/authStore'

interface UseReportStatusOptions {
    intervalMs?: number
    enabled?: boolean
}

// 폴링을 중단할 최종 상태 목록
const TERMINAL_STATUSES: Status[] = ['COMPLETED', 'FAILED']

/**
 * 모든 리포트 단계가 최종 상태에 도달했는지 확인하는 헬퍼 함수
 * @param status - 확인할 리포트 상태 객체
 * @returns 모든 단계가 최종 상태이면 true, 아니면 false
 */
export const areAllTasksTerminal = (status: ReportStatus): boolean => {
    return (
        TERMINAL_STATUSES.includes(status.overviewStatus) &&
        TERMINAL_STATUSES.includes(status.analysisStatus) &&
        TERMINAL_STATUSES.includes(status.ideaStatus)
    )
}

/**
 * 리포트의 상세 상태를 주기적으로 폴링하는 커스텀 훅
 * 모든 하위 작업이 완료/실패 시 폴링을 자동으로 중지
 * @param reportId - 조회할 리포트의 ID (number 타입)
 * @param options - 폴링 간격 등 추가 옵션
 */
export const usePollReportStatus = (reportId: number | undefined, options: UseReportStatusOptions = {}) => {
    const { intervalMs = 3000, enabled = true } = options

    const channelId = useAuthStore((state) => state.user?.channelId)
    const { updateReportStatus, removeReportStatus, removePendingReportId, beginReportCleanup } = useReportStore(
        (state) => state.actions
    )
    const cleanupReportIds = useReportStore((state) => state.cleanupReportIds)
    const { mutate: deleteReport } = useDeleteMyReport({ channelId })

    const query = useQuery<ResponseReportStatus, Error, ReportStatus>({
        queryKey: ['reportStatus', reportId],
        queryFn: () => {
            if (typeof reportId !== 'number') {
                throw new Error('Report ID must be a number.')
            }
            return getReportStatus({ reportId })
        },
        refetchInterval: (query) => {
            const reportData = query.state.data?.result
            if (reportData && areAllTasksTerminal(reportData)) {
                return false
            }
            return intervalMs
        },
        enabled: typeof reportId === 'number' && enabled,
        retry: 0,
        refetchOnWindowFocus: false,
        select: (data) => data.result,
    })

    useEffect(() => {
        if (query.data && typeof reportId === 'number') {
            updateReportStatus(reportId, query.data)

            const isAnyFailed = Object.values(query.data).includes('FAILED')
            if (isAnyFailed && !cleanupReportIds.includes(reportId)) {
                beginReportCleanup(reportId)
                removeReportStatus(reportId)
                removePendingReportId(reportId)
                deleteReport({ reportId })
                return
            }

            if (areAllTasksTerminal(query.data)) {
                removePendingReportId(reportId)
            }
        }
    }, [
        query.data,
        reportId,
        updateReportStatus,
        deleteReport,
        removeReportStatus,
        removePendingReportId,
        beginReportCleanup,
        cleanupReportIds,
    ])

    return query
}

/**
 * 리포트의 상태를 일회성으로 조회해 스토어에 업데이트하는 커스텀 훅
 * @param reportId - 조회할 리포트의 ID
 * @returns isInvalidReportError - 초기 상태 조회 시 존재하지 않는 리포트 등의 에러 발생 여부
 */
export const useGetInitialReportStatus = (reportId: number) => {
    const currentReportStatus = useReportStore((state) => state.statuses[reportId])
    const updateReportStatus = useReportStore((state) => state.actions.updateReportStatus)

    const { data: initialStatusData, isError: isInvalidReportError } = useQuery({
        queryKey: ['reportStatus', reportId, 'initialCheck'],
        queryFn: () => getReportStatus({ reportId }),
        enabled: !!reportId && !currentReportStatus,
        retry: false,
        refetchOnWindowFocus: false,
        select: (data) => data.result,
    })

    useEffect(() => {
        if (initialStatusData) {
            updateReportStatus(reportId, initialStatusData)
        }
    }, [initialStatusData, reportId, updateReportStatus])

    return { isInvalidReportError }
}

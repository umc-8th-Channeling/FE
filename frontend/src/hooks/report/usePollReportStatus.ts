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
 * 리포트의 상세 상태를 주기적으로 폴링하는 커스텀 훅.
 * 모든 하위 작업이 완료/실패 시 폴링을 자동으로 중지합니다.
 * @param reportId - 조회할 리포트의 ID (number 타입)
 * @param options - 폴링 간격 등 추가 옵션
 */
export const usePollReportStatus = (reportId: number | undefined, options: UseReportStatusOptions = {}) => {
    const { intervalMs = 3000, enabled = true } = options

    // const user = useAuthStore((state) => state.user)
    // const channelId = user?.channelId
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

            if (areAllTasksTerminal(query.data)) {
                removePendingReportId(reportId)
            }

            const isAnyFailed = Object.values(query.data).includes('FAILED')
            if (isAnyFailed && !cleanupReportIds.includes(reportId)) {
                // 정리 절차를 시작하고, 모든 관련 상태를 즉시 정리합니다.
                beginReportCleanup(reportId)
                deleteReport({ reportId })
                removeReportStatus(reportId)
                removePendingReportId(reportId) // 실패했으므로 폴링을 즉시 중단합니다.

                // 실패 처리가 끝났으므로 더 이상 다른 조건을 확인할 필요가 없습니다.
                return
            }

            // ✅ 2. 실패가 아닐 경우에만, 성공적으로 모든 작업이 완료되었는지 확인합니다.
            // (isAnyFailed가 false이므로, 이 조건은 모든 상태가 'COMPLETED'일 때만 충족됩니다.)
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

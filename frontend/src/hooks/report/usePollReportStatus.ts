import { useQuery } from '@tanstack/react-query'
import type { ReportStatus, ResponseReportStatus, Status } from '../../types/report/new'
import { getReportStatus } from '../../api/report'

interface UseReportStatusOptions {
    intervalMs?: number // 폴링 간격 (밀리초)
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
export const usePoolReportStatus = (reportId: number | undefined, options: UseReportStatusOptions = {}) => {
    const { intervalMs = 3000 } = options // 기본 폴링 간격 3초

    return useQuery<ResponseReportStatus, Error>({
        queryKey: ['reportStatus', reportId],

        queryFn: () => {
            if (typeof reportId !== 'number') {
                throw new Error('Report ID must be a number.')
            }
            return getReportStatus({ reportId })
        },

        // 폴링 로직
        refetchInterval: (query) => {
            const reportData = query.state.data?.result

            // 데이터가 있고, 모든 작업이 종료 상태이면 폴링 중지 (false 반환)
            if (reportData && areAllTasksTerminal(reportData)) {
                return false
            }
            // 그 외의 경우, 설정된 간격으로 계속 폴링
            return intervalMs
        },

        // reportId가 유효한 숫자일 때만 훅을 활성화
        enabled: typeof reportId === 'number',

        refetchOnWindowFocus: false,
    })
}

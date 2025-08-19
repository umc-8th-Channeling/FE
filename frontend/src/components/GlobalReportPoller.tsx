import { usePollReportStatus } from '../hooks/report/usePollReportStatus'
import { useReportStore } from '../stores/reportStore'

// 각 ID에 대한 폴링 작업을 수행하는 개별 워커 컴포넌트
function PollWorker({ reportId }: { reportId: number }) {
    // 훅을 호출하여 특정 ID에 대한 폴링을 시작합니다.
    usePollReportStatus(reportId, { enabled: true })
    return null
}

// 전역 폴러: pending 중인 모든 리포트를 감시합니다.
export function GlobalReportPoller() {
    // 스토어에서 폴링이 필요한 모든 리포트 ID를 가져옵니다.
    const pendingReportIds = useReportStore((state) => state.pendingReportIds)

    return (
        <>
            {/* 각 ID에 대해 개별적으로 폴링 워커를 실행합니다. */}
            {pendingReportIds.map((id) => (
                <PollWorker key={id} reportId={id} />
            ))}
        </>
    )
}

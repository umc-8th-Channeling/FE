import type { CommonResponse } from '../common'

// URL로 리포트 분석 요청
export type PostReportByUrlDto = {
    url: string
}

export type ResponseReportByUrl = CommonResponse<{ reportId: number }>

// 리포트 분석 상태 조회
export type ReportStatusDto = {
    reportId: number
}

export type Status = 'PENDING' | 'COMPLETED' | 'FAILED'

export type ReportStatus = {
    taskId: number
    reportId: number
    overviewStatus: Status
    analysisStatus: Status
    ideaStatus: Status
}

export type ResponseReportStatus = CommonResponse<ReportStatus>

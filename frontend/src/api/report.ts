import type { GetReportAllDto, ResponseReportAll } from '../types/report/all'
import type { ReportCommentsDto, ResponseReportComments } from '../types/report/comment'
import type { PostReportByUrlDto, ReportStatusDto, ResponseReportByUrl } from '../types/report/new'
import { axiosInstance } from './axios'

// URL로 리포트 분석 요청
export const postReportByUrl = async ({ url }: PostReportByUrlDto): Promise<ResponseReportByUrl> => {
    const { data } = await axiosInstance.post(`/reports`, {
        url,
    })
    return data
}

// 리포트 전체 조회
export const getReportAll = async ({ reportId }: GetReportAllDto): Promise<ResponseReportAll> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}`)
    return data
}

// 리포트 댓글 카테고리별 조회
export const getReportComments = async ({ reportId, type }: ReportCommentsDto): Promise<ResponseReportComments> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/comments`, {
        params: { type },
    })
    return data
}

// 리포트 분석 상태 조회
export const getReportStatus = async ({ reportId }: ReportStatusDto) => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/status`)
    return data
}

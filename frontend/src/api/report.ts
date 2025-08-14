import { axiosInstance } from './axios'
import type {
    GetReportDto,
    ResponseReportAnalysis,
    ResponseReportIdea,
    ResponseReportOverview,
    ResponseVideoData,
    VideoDataDto,
} from '../types/report/all'
import type { ReportCommentsDto, ResponseReportComments } from '../types/report/comment'
import type { PostReportByUrlDto, ReportStatusDto, ResponseReportByUrl } from '../types/report/new'

// URL로 리포트 분석 요청
export const postReportByUrl = async ({ url }: PostReportByUrlDto): Promise<ResponseReportByUrl> => {
    const { data } = await axiosInstance.post(`/reports`, {
        url,
    })
    return data
}

// 영상 정보 조회
export const getVideoData = async ({ videoId }: VideoDataDto): Promise<ResponseVideoData> => {
    const { data } = await axiosInstance.get(`/videos/${videoId}`)
    return data
}

// 리포트 개요 페이지 조회
export const getReportOverview = async ({ reportId }: GetReportDto): Promise<ResponseReportOverview> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/overviews`)
    return data
}

// 리포트 분석 페이지 조회
export const getReportAnalysis = async ({ reportId }: GetReportDto): Promise<ResponseReportAnalysis> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/analyses`)
    return data
}

// 리포트 아이디어 페이지 조회
export const getReportIdea = async ({ reportId }: GetReportDto): Promise<ResponseReportIdea> => {
    const { data } = await axiosInstance.get(`/reports/${reportId}/ideas`)
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

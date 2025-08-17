import type {
    GetReportDto,
    ResponseReportAnalysis,
    ResponseReportIdea,
    ResponseReportOverview,
} from '../types/report/all'
import type { ReportCommentsDto, ResponseReportComments } from '../types/report/comment'
import { axiosInstance } from './axios'

export const getDummyOverview = async ({ reportId }: GetReportDto): Promise<ResponseReportOverview> => {
    const { data } = await axiosInstance.get(`/dummys/${reportId}/overviews`)
    return data
}

export const getDummyAnalysis = async ({ reportId }: GetReportDto): Promise<ResponseReportAnalysis> => {
    const { data } = await axiosInstance.get(`/dummys/${reportId}/analyses`)
    return data
}

export const getDummyIdea = async ({ reportId }: GetReportDto): Promise<ResponseReportIdea> => {
    const { data } = await axiosInstance.get(`/dummys/${reportId}/ideas`)
    return data
}

export const getDummyComments = async ({ reportId, type }: ReportCommentsDto): Promise<ResponseReportComments> => {
    const { data } = await axiosInstance.get(`/dummys/${reportId}/comments`, {
        params: { type },
    })
    return data
}

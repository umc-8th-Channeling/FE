import type { GetReportAllDto, ResponseReportAll } from '../types/report/all'
import type { ReportCommentsDto, ResponseReportComments } from '../types/report/comment'
import type { PostNewReportDto, ResponseNewReport } from '../types/report/new'
import { axiosInstance } from './axios'

export const getReportComments = async (params: ReportCommentsDto): Promise<ResponseReportComments> => {
    const { data } = await axiosInstance.get(`/reports/${params.reportId}/comments`, {
        params,
    })
    return data
}

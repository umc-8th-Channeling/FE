import type {
    RequestChannelDto,
    ResponseChannelDto,
    RequestChannelVideoDto,
    ResponseChannelVideoDto,
    MyVideoReportDto,
    ResponseMyVideoReportDto,
} from '../types/profile'
import { axiosInstance } from './axios'

export const getChannelDetail = async ({ channelId }: RequestChannelDto): Promise<ResponseChannelDto> => {
    const { data } = await axiosInstance.get(`/channels/${channelId}`)
    return data
}

export const getChannelVideo = async ({
    channelId,
    type,
    page,
    size,
}: RequestChannelVideoDto): Promise<ResponseChannelVideoDto> => {
    const { data } = await axiosInstance.get(`/channels/${channelId}/videos`, {
        params: {
            type: type,
            ...(page !== undefined && { page }),
            ...(size !== undefined && { size }),
        },
    })
    return data
}

export const postMyVideoReport = async ({ videoId }: MyVideoReportDto): Promise<ResponseMyVideoReportDto> => {
    const { data } = await axiosInstance.post<ResponseMyVideoReportDto>(`/reports/${videoId}`)
    return data
}

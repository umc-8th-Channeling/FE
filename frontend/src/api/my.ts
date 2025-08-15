import type {
    RequestChannelDto,
    ResponseChannelDto,
    RequestChannelVideoDto,
    ResponseChannelVideoDto,
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

import type {
    RequestChannelDto,
    ResponseChannelDto,
    RequestChannelVideoDto,
    ResponseChannelVideoDto,
} from '../types/profile'
import { axiosInstance } from './axios'

export const getChannelDetail = async ({ channelId }: RequestChannelDto): Promise<ResponseChannelDto> => {
    const { data } = await axiosInstance.get(`/channels/${channelId}`)
    console.log('📦 채널 상세 응답:', data)

    return data
}

export const getChannelVideo = async ({
    channelId,
    type,
}: RequestChannelVideoDto): Promise<ResponseChannelVideoDto> => {
    const { data } = await axiosInstance.get(`/channels/${channelId}/videos`, {
        params: {
            type: type,
        },
    })
    console.log('📦 채널 비디오 상세 응답:', data)
    return data
}

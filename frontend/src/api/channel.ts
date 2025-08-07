import type { ChannelTargetDto, ChannelConceptDto } from '../types/channel'
import { axiosInstance } from './axios'

export const updateChannelTarget = async ({ channelId, target }: ChannelTargetDto) => {
    const res = await axiosInstance.patch(`/channels/${channelId}/target`, { target })
    return res.data
}

export const updateChannelConcept = async ({ channelId, concept }: ChannelConceptDto) => {
    const res = await axiosInstance.patch(`/channels/${channelId}/concept`, { concept })
    return res.data
}

export const getMyProfile = async () => {
    const res = await axiosInstance.get('/members')
    return res.data
}

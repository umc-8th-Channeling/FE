import { customAxios } from './axios'

export const updateChannelTarget = async (channelId: number, target: string) => {
    const response = await customAxios.patch(`/channels/${channelId}/target`, {
        target,
    })
    return response.data
}

export const updateChannelConcept = async (channelId: number, concept: string) => {
    const response = await customAxios.patch(`/channels/${channelId}/concept`, {
        concept,
    })
    return response.data
}

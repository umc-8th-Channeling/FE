import type { CommonResponse } from './common'

export interface ChannelTargetDto {
    channelId: number
    target: string
}

export interface ChannelConceptDto {
    channelId: number
    concept: string
}

export interface User {
    memberId: number
    channelId?: number
    nickname: string
    googleEmail: string
    profileImage: string
    instagramLink: string | null
    tiktokLink: string | null
    facebookLink: string | null
    twitterLink: string | null
}

export type ResponseMyProfile = CommonResponse<User>

export type VideoReportDto = {
    taskId: number
    videoId: number
}

export type ResponseVideoReportDto = CommonResponse<VideoReportDto>

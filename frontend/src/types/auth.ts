import type { CommonResponse } from './common'

export interface User {
    memberId: number
    nickname: string
    googleEmail: string
    profileImage: string
    instagramLink: string | null
    tiktokLink: string | null
    facebookLink: string | null
    twitterLink: string | null
}

export type ResponseMyProfile = CommonResponse<User>

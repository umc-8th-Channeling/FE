export type MemberAgreeDto = {
    id?: number
    marketingEmailAgree?: boolean
    dayContentEmailAgree?: boolean
    memberId?: number
}

export type MemberSNSDto = {
    instagramLink?: string
    tiktokLink?: string
    facebookLink?: string
    twitterLink?: string
}

export type MemberProfileImageDto = {
    member: {
        createdAt?: string
        updatedAt?: string
        id?: number
        nickname?: string
        googleEmail?: string
        profileImage?: string
        instagramLink?: string
        tiktokLink?: string
        facebookLink?: string
        twitterLink?: string
        googleId?: string
    }

    updateProfileImageReq: {
        image?: string
    }
}

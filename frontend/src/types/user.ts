export type MemberAgreeDto = {
    marketingEmailAgree?: boolean
    dayContentEmailAgree?: boolean
}

export type MemberSNSDto = {
    instagramLink?: string | null
    tiktokLink?: string | null
    facebookLink?: string | null
    twitterLink?: string | null
}

export type MemberProfileImageDto = {
    updateProfileImageReq: {
        image?: string | File
    }
}

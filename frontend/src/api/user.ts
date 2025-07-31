import type { MemberAgreeDto, MemberProfileImageDto, MemberSNSDto } from '../types/user'
import { axiosInstance } from './axios'

export const patchMemberAgree = async ({ marketingEmailAgree, dayContentEmailAgree, id, memberId }: MemberAgreeDto) => {
    const { data } = await axiosInstance.patch('/member-agree', {
        marketingEmailAgree,
        dayContentEmailAgree,
        id,
        memberId,
    })
    return data
}

export const patchMemberSNS = async ({ instagramLink, tiktokLink, facebookLink, twitterLink }: MemberSNSDto) => {
    const { data } = await axiosInstance.patch('/members/update-sns', {
        instagramLink,
        tiktokLink,
        facebookLink,
        twitterLink,
    })
    return data
}

export const patchMemberProfileImage = async ({ updateProfileImageReq }: MemberProfileImageDto) => {
    const formData = new FormData()
    if (updateProfileImageReq?.image) {
        formData.append('image', updateProfileImageReq.image)
    }

    const { data } = await axiosInstance.patch('/members/profile-image', formData)
    return data
}

import type { MemberAgreeDto, MemberProfileImageDto, MemberSNSDto } from '../types/user'
import { axiosInstance } from './axios'

export const updateMemberAgree = async ({ marketingEmailAgree, dayContentEmailAgree }: MemberAgreeDto) => {
    const { data } = await axiosInstance.patch('/member-agree', {
        marketingEmailAgree,
        dayContentEmailAgree,
    })
    return data
}

export const updateMemberSNS = async ({ instagramLink, tiktokLink, facebookLink, twitterLink }: MemberSNSDto) => {
    const { data } = await axiosInstance.patch('/members/update-sns', {
        instagramLink,
        tiktokLink,
        facebookLink,
        twitterLink,
    })
    return data
}

export const updateMemberProfileImage = async ({ updateProfileImageReq }: MemberProfileImageDto) => {
    const formData = new FormData()
    if (updateProfileImageReq?.image) {
        formData.append('image', updateProfileImageReq.image)
    }

    const { data } = await axiosInstance.patch('/members/profile-image', formData)
    return data
}

export const fetchMyProfile = async () => {
    const { data } = await axiosInstance.get('/members')
    return data
}

import { useMutation } from '@tanstack/react-query'
import { patchMemberAgree, patchMemberProfileImage, patchMemberSNS } from '../../api/user'

export const usePatchMemberAgree = () => {
    return useMutation({
        mutationFn: patchMemberAgree,
    })
}

export const usePatchMemberSNS = () => {
    return useMutation({
        mutationFn: patchMemberSNS,
    })
}

export const usePatchMemberProfileImage = () => {
    return useMutation({
        mutationFn: patchMemberProfileImage,
    })
}

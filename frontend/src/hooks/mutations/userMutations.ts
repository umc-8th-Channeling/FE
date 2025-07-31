import { useMutation } from '@tanstack/react-query'
import { patchMemberAgree, patchMemberProfileImage, patchMemberSNS } from '../../api/user'

export function usePatchMemberAgree() {
    return useMutation({
        mutationFn: patchMemberAgree,
    })
}

export function usePatchMemberSNS() {
    return useMutation({
        mutationFn: patchMemberSNS,
    })
}

export function usePatchMemberProfileImage() {
    return useMutation({
        mutationFn: patchMemberProfileImage,
    })
}

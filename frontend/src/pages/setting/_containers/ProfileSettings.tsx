import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useRef } from 'react'
import { useAuthStore } from '../../../stores/authStore'
import { useFetchMyProfile } from '../../../hooks/setting/useFetchMyProfile'
import { useUpdateMemberProfileImage } from '../../../hooks/setting/userMutations'
import { useSNSFormStore } from '../../../stores/snsFormStore'
import SnsSettings from './SnsSettings'

type Props = {
    onOpenWithdraw: () => void
    fetchEnabled: boolean
}

export default function ProfileSettings({ onOpenWithdraw, fetchEnabled }: Props) {
    const queryClient = useQueryClient()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { user } = useAuthStore()
    const { data: myProfile } = useFetchMyProfile(fetchEnabled)

    const { setFormData, resetFormData, ownerId, setOwner, formData } = useSNSFormStore()
    const { mutate: updateProfileImage } = useUpdateMemberProfileImage()

    const userId = user?.memberId ?? null
    const userLinks = useMemo(
        () => ({
            instagram: user?.instagramLink ?? '',
            tiktok: user?.tiktokLink ?? '',
            facebook: user?.facebookLink ?? '',
            x: user?.twitterLink ?? '',
        }),
        [user?.instagramLink, user?.tiktokLink, user?.facebookLink, user?.twitterLink]
    )

    useEffect(() => {
        if (!userId) return

        // 사용자 변경시
        if (ownerId !== userId) {
            // persist 저장소 비우기
            useSNSFormStore.persist?.clearStorage?.()
            // 메모리 초기화
            resetFormData()
            setOwner(userId)
            setFormData(userLinks)
            return
        }

        if (!Object.values(formData).some(Boolean)) {
            setFormData(userLinks)
        }
    }, [userId, ownerId, formData, userLinks, resetFormData, setFormData, setOwner])

    const handleCameraClick = () => fileInputRef.current?.click()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        updateProfileImage(
            { image: file },
            {
                onSuccess: (data) => {
                    console.log('프로필 이미지 업로드 성공: ', data)
                    queryClient.invalidateQueries({ queryKey: ['my-profile'] })
                },
                onError: () => {
                    alert('프로필 이미지 업로드에 실패했습니다.')
                },
            }
        )
    }

    return (
        <SnsSettings
            profileImageUrl={myProfile?.profileImage ?? '/default-profile.png'}
            nickname={user?.nickname ?? ''}
            googleEmail={user?.googleEmail ?? ''}
            onFileChange={handleFileChange}
            onCameraClick={handleCameraClick}
            onWithdraw={onOpenWithdraw}
            fileInputRef={fileInputRef}
        />
    )
}

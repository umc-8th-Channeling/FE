import { useState } from 'react'
import { useUpdateMemberSNS } from '../../../hooks/setting/userMutations'
import { useSNSFormStore, type SNSKey } from '../../../stores/snsFormStore'
import ProfileTab from '../_components/ProfileTab'

type Props = {
    profileImageUrl: string
    nickname: string
    googleEmail: string
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onCameraClick: () => void
    onWithdraw: () => void
    fileInputRef: React.RefObject<HTMLInputElement | null>
}

export default function SnsSettings({
    profileImageUrl,
    nickname,
    googleEmail,
    onFileChange,
    onCameraClick,
    onWithdraw,
    fileInputRef,
}: Props) {
    const { formData, updateFormValue } = useSNSFormStore()
    const { mutate: updateSNS } = useUpdateMemberSNS()

    const [editing, setEditing] = useState(false)
    const [modified, setModified] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        updateFormValue(name as SNSKey, value)
        setModified(true)
    }

    const handleEditToggle = () => {
        setEditing((prev) => !prev)
        setModified(false)
    }

    const handleSaveSNS = () => {
        const payload = {
            instagramLink: formData.instagram,
            tiktokLink: formData.tiktok,
            facebookLink: formData.facebook,
            twitterLink: formData.x,
        }

        updateSNS(payload, {
            onSuccess: () => {
                setModified(false)
                setEditing(false)
            },
            onError: () => {
                alert('SNS 정보 저장에 실패했습니다.')
            },
        })
    }

    return (
        <ProfileTab
            formData={formData}
            editing={editing}
            modified={modified}
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            googleEmail={googleEmail}
            onEditToggle={handleEditToggle}
            onChange={handleChange}
            onSaveSNS={handleSaveSNS}
            onFileChange={onFileChange}
            onCameraClick={onCameraClick}
            onWithdraw={onWithdraw}
            fileInputRef={fileInputRef}
        />
    )
}

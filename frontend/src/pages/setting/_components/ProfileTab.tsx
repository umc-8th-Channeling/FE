import { type RefObject } from 'react'
import { Label } from './SettingLabel'
import Input from './SettingInput'
import { EditButton } from '../../../components/EditButton'
import SendIcon from '../../../assets/icons/send.svg?react'
import CameraIcon from '../../../assets/icons/camera.svg?react'
import ProfileImage from './ProfileImage'

const labelMap = {
    instagram: '인스타',
    tiktok: '틱톡',
    facebook: '페이스북',
    x: 'X',
} as const

type SNSKey = keyof typeof labelMap

type Props = {
    formData: Record<SNSKey, string>
    editing: boolean
    modified: boolean
    profileImageUrl: string | null
    nickname: string
    googleEmail: string
    onEditToggle: () => void
    onSaveSNS: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onCameraClick: () => void
    onWithdraw: () => void
    fileInputRef: RefObject<HTMLInputElement | null>
}

export default function ProfileTab({
    formData,
    editing,
    modified,
    profileImageUrl,
    nickname,
    googleEmail,
    onEditToggle,
    onSaveSNS,
    onChange,
    onFileChange,
    onCameraClick,
    onWithdraw,
    fileInputRef,
}: Props) {
    const handleEditButtonClick = () => {
        if (editing) {
            onSaveSNS()
        }
        onEditToggle()
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={onFileChange} />

            {/* 프로필 이미지 */}
            <div className="flex items-center justify-center w-full">
                <div className="relative">
                    <ProfileImage imageUrl={profileImageUrl} className="w-[100px] h-[100px]" />
                    <button
                        className="absolute bottom-0 right-0 w-8 h-8 p-1 flex items-center justify-center rounded-full bg-gray-200"
                        onClick={onCameraClick}
                    >
                        <CameraIcon />
                    </button>
                </div>
            </div>

            {/* 유저 정보 */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label className="font-body-16b text-gray-600">닉네임</Label>
                    <div className="font-title-20b">{nickname}</div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="font-body-16b text-gray-600">이메일</Label>
                    <div className="font-title-20b">{googleEmail}</div>
                </div>
            </div>

            {/* SNS 링크 */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Label className="font-body-16b">SNS 링크 추가</Label>
                    <EditButton
                        onClick={handleEditButtonClick}
                        label={editing ? '완료' : '수정'}
                        buttonColor={editing ? (modified ? 'text-primary-500' : 'text-gray-600') : 'text-gray-900'}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    {(Object.keys(labelMap) as SNSKey[]).map((sns) => (
                        <div key={sns} className="flex flex-col gap-2">
                            <Label className="font-caption-14r text-gray-600">{labelMap[sns]}</Label>
                            <Input
                                name={sns}
                                placeholder="SNS 링크를 입력해주세요."
                                value={formData[sns]}
                                onChange={onChange}
                                disabled={!editing}
                                editing={editing}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="desktop:pb-6">
                <button
                    className="w-full font-title-18b flex items-center justify-between cursor-pointer"
                    onClick={onWithdraw}
                >
                    <span>탈퇴하기</span>
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}

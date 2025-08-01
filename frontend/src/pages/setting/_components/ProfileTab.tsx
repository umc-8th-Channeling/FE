import { type RefObject } from 'react'
import { Label } from './SettingLabel'
import Input from './SettingInput'
import { EditButton } from '../../../components/EditButton'
import SendIcon from '../../../assets/icons/send.svg?react'
import CameraIcon from '../../../assets/icons/camera.svg?react'

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
    profileImageUrl: string
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
    onEditToggle,
    onSaveSNS,
    onChange,
    onFileChange,
    onCameraClick,
    onWithdraw,
    fileInputRef,
}: Props) {
    // 버튼 클릭 시: 수정 → 완료 전환될 때 onSaveSNS 실행
    const handleEditButtonClick = () => {
        if (editing) {
            // 완료 버튼 클릭 시 저장 호출
            onSaveSNS()
        }
        onEditToggle()
    }

    return (
        <div className="flex flex-col gap-10 w-full">
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={onFileChange} />

            {/* 프로필 이미지 */}
            <div className="flex items-center justify-center w-full">
                <div className="relative w-[100px] h-[100px]">
                    <div
                        className="w-full h-full rounded-full bg-cover bg-no-repeat bg-center bg-[lightgray]"
                        style={{ backgroundImage: `url(${profileImageUrl})` }}
                    />
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
                    <Label className="font-body-bold text-gray-600">닉네임</Label>
                    <div className="font-title">찰스엔터</div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="font-body-bold text-gray-600">이메일</Label>
                    <div className="font-title">kjh213513@gmail.com</div>
                </div>
            </div>

            {/* SNS 링크 */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Label className="font-body-bold">SNS 링크 추가</Label>
                    <EditButton
                        onClick={handleEditButtonClick}
                        label={editing ? '완료' : '수정'}
                        buttonColor={editing ? (modified ? 'text-primary-500' : 'text-gray-600') : 'text-gray-900'}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    {(Object.keys(labelMap) as SNSKey[]).map((sns) => (
                        <div key={sns} className="flex flex-col gap-2">
                            <Label className="font-caption text-gray-600">{labelMap[sns]}</Label>
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
                <button className="w-full font-title-bold flex items-center justify-between" onClick={onWithdraw}>
                    <span>탈퇴하기</span>
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}

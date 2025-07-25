import { useRef, type RefObject } from 'react'
import { Label } from './SettingLabel'
import Input from './SettingInput'
import EditIcon from '../../../assets/icons/edit.svg?react'
import CompleteIcon from '../../../assets/icons/complete_off.svg?react'
import CompleteRedIcon from '../../../assets/icons/complete_on.svg?react'
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
    onChange,
    onFileChange,
    onCameraClick,
    onWithdraw,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="flex flex-col gap-10 w-full">
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={onFileChange} />

            <div className="flex items-center justify-center w-full">
                <div className="relative w-[100px] h-[100px]">
                    <div
                        className="w-full h-full rounded-full bg-cover bg-no-repeat bg-center bg-[lightgray]"
                        style={{ backgroundImage: `url(${profileImageUrl})` }}
                    ></div>
                    <button
                        className="absolute bottom-0 right-0 w-8 h-8 p-1 flex items-center justify-center rounded-full bg-gray-200"
                        onClick={onCameraClick}
                    >
                        <CameraIcon />
                    </button>
                </div>
            </div>

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

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Label className="font-body-bold">SNS 링크 추가</Label>
                    <button onClick={onEditToggle}>
                        {editing ? modified ? <CompleteRedIcon /> : <CompleteIcon /> : <EditIcon />}
                    </button>
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

import { useEffect, useRef, useState } from 'react'
import { Button } from './_components/SettingButton'
import { Label } from './_components/SettingLabel'
import Input from './_components/SettingInput'
import '../../styles/scrollbar.css'
import EditIcon from '../../assets/icons/edit.svg?react'
import CompleteIcon from '../../assets/icons/complete_off.svg?react'
import CompleteRedIcon from '../../assets/icons/complete_on.svg?react'
import SendIcon from '../../assets/icons/send.svg?react'
import CloseIcon from '../../assets/icons/delete_normal.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import CameraIcon from '../../assets/icons/camera.svg?react'
import WithdrawlModal from './_components/WithdrawlModal'
import CustomToggle from '../../components/CustomToggle'

const labelMap = {
    instagram: '인스타',
    tiktok: '틱톡',
    facebook: '페이스북',
    x: 'X',
} as const

type SNSKey = keyof typeof labelMap

type SettingPageProps = {
    onClose?: () => void
}

export default function SettingPage({ onClose }: SettingPageProps) {
    const [formData, setFormData] = useState<Record<SNSKey, string>>({
        instagram: '',
        tiktok: '',
        facebook: '',
        x: '',
    })

    const [activeTab, setActiveTab] = useState<'profile' | 'consent'>('profile')
    const [marketingEmail, setMarketingEmail] = useState(false)
    const [dailyContentEmail, setDailyContentEmail] = useState(true)
    const [editing, setEditing] = useState(false)
    const [modified, setModified] = useState(false)
    const [showWithdrawlModal, setShowWithdrawlModal] = useState(false)

    const [profileImageUrl, setProfileImageUrl] = useState('/path-to-image.jpg')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [imageChanged, setImageChanged] = useState(false)

    const handleCameraClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const previewUrl = URL.createObjectURL(file)
        setProfileImageUrl(previewUrl)
        setImageChanged(true)
    }

    useEffect(() => {
        if (imageChanged) {
            console.log('이미지 저장됨:', profileImageUrl)
            setImageChanged(false)
        }
    }, [profileImageUrl, imageChanged])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setModified(true)
    }

    const handleEditToggle = () => {
        setEditing(!editing)
        setModified(false)
    }

    const handleWithdrawlConfirm = () => {
        setShowWithdrawlModal(false)
    }

    return (
        <div className="fixed inset-0 z-50 bg-neutral-black-opacity50 flex justify-center items-center tablet:py-10">
            <div
                className="
                    flex flex-col w-full h-full bg-gray-100 overflow-hidden
                    tablet:rounded-3xl tablet:max-w-[588px] tablet:max-h-[841px] desktop:max-w-[792px] desktop:max-h-[600px]
                "
            >
                <div className="flex shrink-0 justify-between items-center w-full p-6 bg-gray-100">
                    <h2 className="font-title">설정</h2>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-1 min-h-0 w-full">
                    {/* 사이드바 */}
                    <div className="flex flex-col justify-between items-start p-4 w-fit bg-gray-50">
                        <div className="flex flex-col gap-y-4">
                            <Button
                                variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                                onClick={() => setActiveTab('profile')}
                            >
                                계정 및 프로필 설정
                            </Button>
                            <Button
                                variant={activeTab === 'consent' ? 'secondary' : 'ghost'}
                                onClick={() => setActiveTab('consent')}
                            >
                                동의
                            </Button>
                        </div>
                        <Button variant="ghost" className="flex items-center justify-between">
                            <span>로그아웃</span>
                            <LogoutIcon />
                        </Button>
                    </div>

                    {/* 본문 */}
                    <div className="[&::-webkit-scrollbar]:hidden flex flex-1 flex-col p-8 gap-10 overflow-y-auto">
                        {activeTab === 'profile' && (
                            <div className="flex flex-col gap-10 w-full">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                {/* 프로필 이미지 + 카메라 버튼 */}
                                <div className="flex items-center justify-center w-full">
                                    <div className="relative w-[100px] h-[100px]">
                                        <div
                                            className="w-full h-full rounded-full bg-cover bg-no-repeat bg-center bg-[lightgray]"
                                            style={{ backgroundImage: `url(${profileImageUrl})` }}
                                        ></div>
                                        <button
                                            className="absolute bottom-0 right-0 w-8 h-8 p-1 flex items-center justify-center rounded-full bg-gray-200"
                                            onClick={handleCameraClick}
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
                                        <button onClick={handleEditToggle}>
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
                                                    onChange={handleChange}
                                                    disabled={!editing}
                                                    editing={editing}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="desktop:pb-6">
                                    <button
                                        className="w-full font-title-bold flex items-center justify-between"
                                        onClick={() => setShowWithdrawlModal(true)}
                                    >
                                        <span>탈퇴하기</span>
                                        <SendIcon />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'consent' && (
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-caption-medium text-gray-600">이메일 알림</Label>

                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-body-bold">마케팅 이메일 수신 동의</span>
                                            <span className="font-caption text-gray-600">
                                                이벤트 또는 혜택과 관련된 마케팅 이메일 수신을 받아요.
                                            </span>
                                        </div>
                                        <CustomToggle
                                            id="marketing-toggle"
                                            checked={marketingEmail}
                                            onChange={setMarketingEmail}
                                        />
                                        {/* <SettingToggle checked={marketingEmail} onChange={setMarketingEmail} /> */}
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-body-bold">일일 콘텐츠 추천 이메일 수신</span>
                                            <span className="font-caption text-gray-600">
                                                프리미엄 요금제에서 제공되는 일일 콘텐츠를 추천받아요.
                                            </span>
                                        </div>
                                        <CustomToggle
                                            id="daily-content-toggle"
                                            checked={dailyContentEmail}
                                            onChange={setDailyContentEmail}
                                        />
                                        {/* <SettingToggle checked={dailyContentEmail} onChange={setDailyContentEmail} /> */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showWithdrawlModal && (
                <WithdrawlModal onClose={() => setShowWithdrawlModal(false)} onConfirm={handleWithdrawlConfirm} />
            )}
        </div>
    )
}

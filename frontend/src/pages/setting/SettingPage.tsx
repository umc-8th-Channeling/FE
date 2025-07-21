import { useEffect, useRef, useState } from 'react'
import { Button } from './components/SettingButton'
import { Label } from './components/SettingLabel'
import Input from './components/SettingInput'
import SettingToggle from './components/SettingToggle'
import '../../styles/scrollbar.css'
import EditIcon from '../../assets/icons/edit.svg?react'
import CompleteIcon from '../../assets/icons/complete_off.svg?react'
import CompleteRedIcon from '../../assets/icons/complete_on.svg?react'
import SendIcon from '../../assets/icons/send.svg?react'
import CloseIcon from '../../assets/icons/delete_normal.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import CameraIcon from '../../assets/icons/camera.svg?react'
import WithdrawlModal from './components/WithdrawlModal'

const labelMap = {
    instagram: '인스타그램',
    tiktok: '틱톡',
    facebook: '페이스북',
    x: 'X',
} as const

type SNSKey = keyof typeof labelMap

type SettingPageProps = {
    onClose: () => void
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

    const [deviceSize, setDeviceSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [imageChanged, setImageChanged] = useState(false)

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth
            if (width >= 1440) setDeviceSize('desktop')
            else if (width >= 768) setDeviceSize('tablet')
            else setDeviceSize('mobile')
        }
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

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
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-[#262626] text-white w-[792px] max-h-[90vh] rounded-xl overflow-hidden flex flex-col">
                <div className="flex w-[792px] h-[76px] px-6 justify-between items-center flex-shrink-0 bg-[#262626]">
                    <h2 className="font-title">설정</h2>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex">
                    {/* 사이드바 */}
                    <div className="flex flex-col justify-between items-start self-stretch p-4 w-[167px] box-border bg-[#161616]">
                        <div className="flex flex-col gap-y-4">
                            <Button
                                variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                                className="min-w-max whitespace-nowrap"
                                onClick={() => setActiveTab('profile')}
                            >
                                계정 및 프로필 설정
                            </Button>
                            <Button
                                variant={activeTab === 'consent' ? 'secondary' : 'ghost'}
                                className="w-full text-left"
                                onClick={() => setActiveTab('consent')}
                            >
                                동의
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full text-left text-[#F4F4F4] mt-auto flex items-center justify-between"
                        >
                            <span>로그아웃</span>
                            <LogoutIcon />
                        </Button>
                    </div>

                    {/* 본문 */}
                    <div
                        className="relative w-[625px] h-[524px] self-stretch flex flex-col items-end p-8 gap-10 overflow-y-auto"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <style>
                            {`
                                div::-webkit-scrollbar {
                                    display: none;
                                }
                            `}
                        </style>

                        {activeTab === 'profile' && (
                            <div className="flex flex-col gap-10 w-full">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                <button
                                    className="absolute top-[100px] right-[263px] w-8 h-8 p-1 flex items-center justify-center rounded-full bg-[#393939]"
                                    onClick={handleCameraClick}
                                >
                                    <div className="w-full h-full object-contain">
                                        <CameraIcon />
                                    </div>
                                </button>

                                <div className="flex items-center justify-center h-full gap-4">
                                    <div
                                        className="w-[100px] h-[100px] rounded-[100px] bg-cover bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage: `url(${profileImageUrl})`,
                                            backgroundColor: 'lightgray',
                                        }}
                                    ></div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-body text-[#A8A8A8]">닉네임</Label>
                                        <div className="font-title text-[#F4F4F4]">찰스엔터</div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="font-body text-[#A8A8A8]">이메일</Label>
                                        <div className="font-title text-[#F4F4F4]">kjh213513@gmail.com</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <Label className="font-body text-[#F4F4F4]">SNS 링크 추가</Label>
                                        <button onClick={handleEditToggle}>
                                            {editing ? modified ? <CompleteRedIcon /> : <CompleteIcon /> : <EditIcon />}
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {(Object.keys(labelMap) as SNSKey[]).map((sns) => (
                                            <div key={sns} className="flex flex-col gap-2">
                                                <Label className="font-caption text-[#A8A8A8]">{labelMap[sns]}</Label>
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

                                <div className="w-full pb-6">
                                    <Button
                                        className="w-full font-title-alt flex items-center justify-between"
                                        onClick={() => setShowWithdrawlModal(true)}
                                    >
                                        <span>탈퇴하기</span>
                                        <SendIcon />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'consent' && (
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-caption text-[#A8A8A8]">이메일 알림</Label>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#F4F4F4] font-body">
                                            이벤트 또는 혜택과 관련된 마케팅 이메일 수신에 동의합니다.
                                        </span>
                                        <SettingToggle checked={marketingEmail} onChange={setMarketingEmail} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#F4F4F4] font-body">
                                        프리미엄 요금제의 기능인 일일 콘텐츠 추천 메일 수신에 동의합니다.
                                    </span>
                                    <SettingToggle checked={dailyContentEmail} onChange={setDailyContentEmail} />
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

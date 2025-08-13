import { useEffect, useRef, useState } from 'react'
import { Button } from './_components/SettingButton'
import '../../styles/scrollbar.css'
import CloseIcon from '../../assets/icons/delete_normal.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import WithdrawlModal from './_components/WithdrawlModal'
import ProfileTab from './_components/ProfileTab'
import ConsentTab from './_components/ConsentTab'

type SettingPageProps = {
    onClose?: () => void
}

export default function SettingPage({ onClose }: SettingPageProps) {
    const [formData, setFormData] = useState({
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

    const handleCameraClick = () => fileInputRef.current?.click()

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
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
                    <h2 className="font-title-20b">설정</h2>
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
                            <ProfileTab
                                formData={formData}
                                editing={editing}
                                modified={modified}
                                profileImageUrl={profileImageUrl}
                                onEditToggle={handleEditToggle}
                                onChange={handleChange}
                                onFileChange={handleFileChange}
                                onCameraClick={handleCameraClick}
                                onWithdraw={() => setShowWithdrawlModal(true)}
                                fileInputRef={fileInputRef}
                            />
                        )}

                        {activeTab === 'consent' && (
                            <ConsentTab
                                marketingEmail={marketingEmail}
                                dailyContentEmail={dailyContentEmail}
                                onMarketingChange={setMarketingEmail}
                                onDailyContentChange={setDailyContentEmail}
                            />
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

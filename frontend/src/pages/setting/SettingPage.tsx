import { useEffect, useRef, useState } from 'react'
import { Button } from './_components/SettingButton'
import '../../styles/scrollbar.css'
import CloseIcon from '../../assets/icons/delete_normal.svg?react'
import LogoutIcon from '../../assets/icons/logout.svg?react'
import WithdrawlModal from './_components/WithdrawlModal'
import ProfileTab from './_components/ProfileTab'
import ConsentTab from './_components/ConsentTab'
import {
    useUpdateMemberAgree,
    useUpdateMemberProfileImage,
    useUpdateMemberSNS,
} from '../../hooks/mutations/userMutations'
import { useAuthStore } from '../../stores/authStore'
import { useProfileImageStore } from '../../stores/profileImageStore'
import { useSNSFormStore, type SNSKey } from '../../stores/snsFormStore'

type SettingPageProps = {
    onClose?: () => void
}

export default function SettingPage({ onClose }: SettingPageProps) {
    const { formData, updateFormValue, setFormData } = useSNSFormStore()

    const [activeTab, setActiveTab] = useState<'profile' | 'consent'>('profile')
    const [marketingEmailAgree, setMarketingEmailAgree] = useState(false)
    const [dayContentEmailAgree, setDayContentEmailAgree] = useState(true)
    const [editing, setEditing] = useState(false)
    const [modified, setModified] = useState(false)
    const [showWithdrawlModal, setShowWithdrawlModal] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { mutate: updateAgree } = useUpdateMemberAgree()
    const { mutate: updateSNS } = useUpdateMemberSNS()
    const { mutate: updateProfileImage } = useUpdateMemberProfileImage()

    const { user } = useAuthStore()

    const { profileImageUrl, setProfileImageUrl } = useProfileImageStore()

    useEffect(() => {
        if (!user) return
        const hasAny = formData.instagram || formData.tiktok || formData.facebook || formData.x
        if (hasAny) return
        setFormData({
            instagram: user.instagramLink ?? '',
            tiktok: user.tiktokLink ?? '',
            facebook: user.facebookLink ?? '',
            x: user.twitterLink ?? '',
        })
    }, [user, formData.instagram, formData.tiktok, formData.facebook, formData.x, setFormData])

    const handleCameraClick = () => fileInputRef.current?.click()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const previewUrl = URL.createObjectURL(file)
        setProfileImageUrl(previewUrl)

        updateProfileImage(
            { updateProfileImageReq: { image: file } },
            {
                onSuccess: (data) => {
                    console.log('프로필 이미지 업로드 성공: ', data)
                    URL.revokeObjectURL(previewUrl)
                },
                onError: () => {
                    alert('프로필 이미지 업로드에 실패했습니다.')
                    URL.revokeObjectURL(previewUrl)
                },
            }
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        updateFormValue(name as SNSKey, value)
        setModified(true)
    }

    const handleEditToggle = () => {
        setEditing((prev) => !prev)
        setModified(false)
    }

    const handleWithdrawlConfirm = () => {
        setShowWithdrawlModal(false)
        console.log('회원 탈퇴 처리')
    }

    const handleAgreeChange = (key: 'marketingEmailAgree' | 'dayContentEmailAgree', value: boolean) => {
        if (key === 'marketingEmailAgree') setMarketingEmailAgree(value)
        if (key === 'dayContentEmailAgree') setDayContentEmailAgree(value)

        const payload = {
            marketingEmailAgree: key === 'marketingEmailAgree' ? value : marketingEmailAgree,
            dayContentEmailAgree: key === 'dayContentEmailAgree' ? value : dayContentEmailAgree,
        }

        updateAgree(payload, {
            onSuccess: (data) => console.log('성공입니다', data),
            onError: () => alert('존재하지 않는 회원 동의입니다.'),
        })
    }

    const handleSaveSNS = () => {
        const payload = {
            instagramLink: formData.instagram,
            tiktokLink: formData.tiktok,
            facebookLink: formData.facebook,
            twitterLink: formData.x,
        }

        updateSNS(payload, {
            onSuccess: (data) => {
                console.log('SNS 정보 저장 성공', data)
                setModified(false)
                setEditing(false)
            },
            onError: () => {
                alert('SNS 정보 저장에 실패했습니다.')
            },
        })
    }

    const handleLogout = () => {
        console.log('로그아웃 처리')
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
                        <Button variant="ghost" className="flex items-center justify-between" onClick={handleLogout}>
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
                                profileImageUrl={profileImageUrl ?? '/default-profile.png'} // 기본값 처리
                                nickname={user?.nickname ?? ''}
                                googleEmail={user?.googleEmail ?? ''}
                                onEditToggle={handleEditToggle}
                                onChange={handleChange}
                                onSaveSNS={handleSaveSNS}
                                onFileChange={handleFileChange}
                                onCameraClick={handleCameraClick}
                                onWithdraw={() => setShowWithdrawlModal(true)}
                                fileInputRef={fileInputRef}
                            />
                        )}

                        {activeTab === 'consent' && (
                            <ConsentTab
                                marketingEmail={marketingEmailAgree}
                                dailyContentEmail={dayContentEmailAgree}
                                onMarketingChange={(value) => handleAgreeChange('marketingEmailAgree', value)}
                                onDailyContentChange={(value) => handleAgreeChange('dayContentEmailAgree', value)}
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

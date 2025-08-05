import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import type { ReportVideoSummary } from '../../types/report'

import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, VideoSummary, GuestModal, UpdateModal } from './_components'
import { AUTH_VIDEO, GUEST_VIDEO } from './dummy'

const TABS = [
    { index: 0, label: '개요', component: <TabOverview /> },
    { index: 1, label: '분석', component: <TabAnalysis /> },
    { index: 2, label: '아이디어', component: <TabIdea /> },
]

export default function ReportPage() {
    const { reportId } = useParams()
    const isAuth = useAuthStore((state) => state.isAuth)

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenGuestModal, setIsOpenGuestModal] = useState(false) // 전역 상태 전환 필요

    // ✅ 임시 비디오 데이터 (API 연결시 수정)
    let video: ReportVideoSummary
    if (reportId) {
        video = AUTH_VIDEO
    } else {
        video = GUEST_VIDEO
    }

    useEffect(() => {
        setIsOpenGuestModal(!isAuth)
    }, [isAuth])

    const handleUpdateModalClick = () => setIsOpenUpdateModal(!isOpenUpdateModal)
    const handleGuestModalClick = () => setIsOpenGuestModal(!isOpenGuestModal)
    const handleResetTab = () => setActiveTab(TABS[0])

    return (
        <>
            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                <VideoSummary video={video} />
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {isOpenGuestModal && <GuestModal onClose={handleGuestModalClick} />}

            {isOpenUpdateModal && (
                <UpdateModal handleModalClick={handleUpdateModalClick} handleResetTab={handleResetTab} />
            )}

            {/* 리포트 업데이트 버튼 */}
            <button
                onClick={handleUpdateModalClick}
                className="
                    cursor-pointer fixed bottom-6 right-6 p-4 rounded-2xl 
                    border border-primary-600 bg-primary-500 shadow-[0_0_8px_0_var(--color-primary-500)]
                "
            >
                <Refresh />
            </button>
        </>
    )
}

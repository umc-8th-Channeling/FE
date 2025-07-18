import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, VideoSummary, GuestModal } from './_components'
import { VIDEO } from './dummy'
import Refresh from '../../assets/icons/refresh_2.svg?react'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'

const TABS = [
    { index: 0, label: '개요', component: <TabOverview /> },
    { index: 1, label: '분석', component: <TabAnalysis /> },
    { index: 2, label: '아이디어', component: <TabIdea /> },
]

export default function ReportPage() {
    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenGuestModal, setIsOpenGuestModal] = useState(false) // 전역 상태 전환 필요

    const video = VIDEO

    useEffect(() => {
        const isGuest = !localStorage.getItem('token')
        setIsOpenGuestModal(isGuest)
    }, [])

    const handleOpenUpdateModalClick = () => setIsOpenUpdateModal(!isOpenUpdateModal)
    const handleOpenGuestModalClick = () => setIsOpenGuestModal(!isOpenGuestModal)

    const handleUpdateClick = () => {
        console.log('Report Page: update')

        setActiveTab(TABS[0]) // 업데이트 후 탭 초기화
        handleOpenUpdateModalClick()
    }

    return (
        <>
            <div className="px-[76px] py-20 space-y-10">
                <VideoSummary video={video} />
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />

                {/* 리포트 업데이트 모달 */}
                {isOpenUpdateModal && (
                    <Modal
                        title="리포트를 업데이트 하시겠어요?"
                        description={`현재 시각 기준으로 다시 분석합니다. \n기존 아이디어 카드는 삭제되며 복구할 수 없습니다. \n필요한 카드는 미리 북마크해 주세요.`}
                        onClose={handleOpenUpdateModalClick}
                    >
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleOpenUpdateModalClick}
                                className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl border border-gray-300 bg-transparent"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleUpdateClick}
                                className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl bg-primary-500"
                            >
                                업데이트
                            </button>
                        </div>
                    </Modal>
                )}
            </div>

            {/* 데모 데이터 기반 레포트 알림 모달 */}
            {isOpenGuestModal && <GuestModal onClose={handleOpenGuestModalClick} />}

            {/* 리포트 업데이트 버튼 */}
            <button
                onClick={handleOpenUpdateModalClick}
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

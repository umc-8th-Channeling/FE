import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

// import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, GuestModal } from './_components'
// import { GUEST_VIDEO } from './dummy'

export default function DummyReportPage() {
    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    // const video = GUEST_VIDEO

    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} /> },
            { index: 2, label: '아이디어', component: <TabIdea reportId={reportId} /> },
        ],
        [reportId]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    // const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenGuestModal, setIsOpenGuestModal] = useState(true)

    // const handleUpdateModalClick = () => setIsOpenUpdateModal(!isOpenUpdateModal)
    const handleGuestModalClick = () => setIsOpenGuestModal(!isOpenGuestModal)
    // const handleResetTab = () => setActiveTab(TABS[0])

    return (
        <>
            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {/* <VideoSummary video={video!.video} /> */}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {isOpenGuestModal && <GuestModal onClose={handleGuestModalClick} />}

            {/* {isOpenUpdateModal && (
                <UpdateModal handleModalClick={handleUpdateModalClick} handleResetTab={handleResetTab} />
            )} */}

            {/* 리포트 업데이트 버튼 */}
            {/* <button
                onClick={handleUpdateModalClick}
                className="
                    cursor-pointer fixed bottom-6 right-6 p-4 rounded-2xl 
                    border border-primary-600 bg-primary-500 shadow-[0_0_8px_0_var(--color-primary-500)]
                "
            >
                <Refresh />
            </button> */}
        </>
    )
}

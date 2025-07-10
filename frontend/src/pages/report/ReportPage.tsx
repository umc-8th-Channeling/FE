import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, VideoSummary } from './_components'
import { VIDEO } from './dummy'
import Refresh from '../../assets/icons/refresh_2.svg?react'

const TABS = [
    { label: '개요', component: <TabOverview /> },
    { label: '분석', component: <TabAnalysis /> },
    { label: '아이디어', component: <TabIdea /> },
]

export default function ReportPage() {
    const video = VIDEO

    return (
        <div className="px-[76px] py-20 space-y-10 bg-gray-50">
            <VideoSummary video={video} />
            <Tabs tabs={TABS} />

            <button
                onClick={() => console.log('Report Page: refresh button')}
                className="
                    cursor-pointer absolute bottom-6 right-6 p-4 rounded-2xl 
                    border border-primary-600 bg-primary-500 shadow-[0_0_8px_0_var(--color-primary-500)]
                "
            >
                <Refresh />
            </button>
        </div>
    )
}

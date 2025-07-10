import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, VideoSummary } from './_components'
import { VIDEO } from './dummy'

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
        </div>
    )
}

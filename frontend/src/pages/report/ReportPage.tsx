import { VideoSummary, Tabs } from './_components'
import { VIDEO } from './dummy'

export default function ReportPage() {
    const video = VIDEO

    return (
        <div className="min-h-screen h-full px-[76px] py-20 space-y-10 bg-gray-50">
            <VideoSummary video={video} />
            <Tabs />
        </div>
    )
}

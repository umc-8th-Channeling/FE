import { useState } from 'react'
import type { TabItem } from '../../../../types/common'
import Tabs from '../../../../components/Tabs'
import { TitledSection } from '../TitledSection'
import { OVERVIEW_COMMENTS as COMMENTS } from '../../dummy'
import { DoughnutChart } from '../../../../components/chart'

const Comments = ({ comments }: { comments: string[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
                <div key={index} className="px-4 py-2 rounded-lg bg-surface-elevate-l2">
                    <span className="max-h-12 line-clamp-2 text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]">
                        {comment}
                    </span>
                </div>
            ))}
        </div>
    )
}

const data = COMMENTS.map((item) => Math.round(item.value * 100))
const TABS = COMMENTS.map(({ label, comments }, index) => ({
    index,
    label,
    component: <Comments comments={comments} />,
}))

export const CommentFeedback = () => {
    const [activeTab, setActiveTab] = useState(TABS[0])

    const handleChartLabelChange = (tab: TabItem) => setActiveTab(tab)

    return (
        <TitledSection title="댓글 반응">
            <div
                className="
                    flex flex-col justify-start items-center min-h-[976px] p-6 gap-8
                    border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-hidden
                    desktop:flex-row desktop:items-start desktop:min-h-full
                "
            >
                <div className="w-full min-w-[280px] max-w-[448px] aspect-square">
                    <DoughnutChart
                        tabs={TABS}
                        data={data}
                        activeIndex={activeTab.index}
                        onClickSegment={handleChartLabelChange} // 도넛 그래프의 segment 클릭하면 활성화 탭 변경
                    />
                </div>

                <div className="desktop:min-w-[672px]">
                    <Tabs
                        tabs={TABS}
                        activeTab={activeTab}
                        onChangeTab={handleChartLabelChange}
                        textStyle="text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]"
                        bgColor="bg-surface-elevate-l2"
                        spaceY="space-y-4"
                    />
                </div>
            </div>
        </TitledSection>
    )
}

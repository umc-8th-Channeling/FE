import { DoughnutChart } from '../../../../components/chart'
import Tabs from '../../../../components/Tabs'
import { TitledSection } from '../TitledSection'
import { OVERVIEW_COMMENTS as COMMENTS } from '../../dummy'

const Comments = ({ comments }: { comments: string[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
                <div
                    key={index}
                    className="px-4 py-2 rounded-lg bg-surface-elevate-l2 text-[16px] leading-[150%] tracking-[-0.4px]"
                >
                    {comment}
                </div>
            ))}
        </div>
    )
}

const TABS = COMMENTS.map(({ label, comments }) => ({
    label,
    component: <Comments comments={comments} />,
}))

export const CommentFeedback = () => {
    return (
        <TitledSection title="댓글 반응">
            <div className="flex flex-col desktop:flex-row justify-center items-center desktop:items-start p-6 gap-8 border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-hidden">
                <div className="desktop:min-w-[448px]">
                    <DoughnutChart labels={['긍정', '부정', '중립', '조언 및 의견']} data={[25, 25, 6, 44]} />
                </div>

                <Tabs
                    tabs={TABS}
                    textStyle="text-[16px] leading-[150%] tracking-[-0.4px]"
                    bgColor="bg-surface-elevate-l2"
                    spaceY="space-y-4"
                />
            </div>
        </TitledSection>
    )
}

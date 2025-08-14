import { useMemo, useState } from 'react'
import { TitledSection } from '../TitledSection'
import { DoughnutChart } from '../../../../components/chart'
import useGetReportComments from '../../../../hooks/report/useGetReportComments'
import { COMMENT_TYPE, type Comment, type CommentType } from '../../../../types/report/comment'
import { useParams } from 'react-router-dom'
import type { OverviewDataProps } from '../../../../types/report/all'
import { CommentSkeleton } from './CommentSkeleton'

const Comments = ({ comments }: { comments: Comment[] | undefined }) => {
    if (!comments || comments.length === 0) return <div />

    return (
        <div className="flex flex-col gap-4">
            {comments?.map((comment) => (
                <div key={comment.commentId} className="px-4 py-2 rounded-lg bg-surface-elevate-l2">
                    <span className="max-h-12 line-clamp-2 text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]">
                        {comment.content}
                    </span>
                </div>
            ))}
        </div>
    )
}

export const CommentFeedback = ({ data }: OverviewDataProps) => {
    const { reportId } = useParams()

    const commentTypes = useMemo(() => Object.keys(COMMENT_TYPE), [])
    const commentLabels = useMemo(() => Object.values(COMMENT_TYPE), [])
    const [activeTab, setActiveTab] = useState<CommentType>('POSITIVE')

    const { data: commentsData, isLoading } = useGetReportComments({ reportId: Number(reportId), type: activeTab })

    const chartData = useMemo(
        () => [data.positiveComment, data.negativeComment, data.neutralComment, data.adviceComment],
        [data]
    )

    const activeIndex = useMemo(() => commentTypes.indexOf(activeTab), [activeTab, commentTypes])

    const handleTabChange = (tabKey: CommentType) => setActiveTab(tabKey)
    const handleChartSegmentClick = (index: number) => setActiveTab(commentTypes[index] as CommentType)

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
                        data={chartData}
                        labels={commentLabels}
                        activeIndex={activeIndex}
                        onClickSegment={handleChartSegmentClick}
                    />
                </div>

                <div className="flex flex-col w-full space-y-4 desktop:min-w-[672px]">
                    <div className="flex flex-row justify-between p-1 gap-2 rounded-lg bg-surface-elevate-l2">
                        {(Object.entries(COMMENT_TYPE) as [CommentType, string][]).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => handleTabChange(key)}
                                className={`
                                    cursor-pointer w-full py-2 rounded-sm transition-colors duration-300 
                                    text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]
                                    ${key === activeTab ? 'bg-gray-50 font-bold' : 'bg-transparent font-medium'}
                                `}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    {isLoading ? <CommentSkeleton /> : <Comments comments={commentsData!.commentList} />}
                </div>
            </div>
        </TitledSection>
    )
}

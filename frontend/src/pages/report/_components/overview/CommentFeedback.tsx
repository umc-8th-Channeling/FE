import { useState } from 'react'
import { TitledSection } from '../TitledSection'
// import { DoughnutChart } from '../../../../components/chart'
import useGetReportComments from '../../../../hooks/report/useGetReportComments'
import { COMMENT_TYPE, type Comment, type CommentType } from '../../../../types/report/comment'
import { useParams } from 'react-router-dom'

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

export const CommentFeedback = () => {
    const { reportId } = useParams()
    const [activeTab, setActiveTab] = useState<CommentType>('POSITIVE')

    const { data, isLoading } = useGetReportComments({ reportId: Number(reportId), type: activeTab })

    const handleTabChange = (tab: CommentType) => setActiveTab(tab)

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
                    {/* <DoughnutChart
                        tabs={TABS}
                        data={data}
                        activeIndex={activeTab.index}
                        onClickSegment={handleTabChange} // 도넛 그래프의 segment 클릭하면 활성화 탭 변경
                    /> */}
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
                    {isLoading ? <div /> : <Comments comments={data!.commentList} />}
                </div>
            </div>
        </TitledSection>
    )
}

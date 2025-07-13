import type { PropsWithChildren } from 'react'
import { formatPercentString, formatKoreanNumber } from '../../../../utils/format'
import { OVERVIEW_EVALUATION } from '../../dummy'
import { TitledSection } from '../TitledSection'

type EvaluationItem = {
    label: string
    score: () => string
    avg?: {
        topic: number
        channel: number
    }
}

const evaluationItems: EvaluationItem[] = [
    { label: '콘텐츠 컨셉 일관성', score: () => `${formatPercentString(OVERVIEW_EVALUATION.consistencyScore)}%` },
    { label: 'SEO 구성', score: () => `${formatPercentString(OVERVIEW_EVALUATION.seoScore)}%` },
    { label: '재방문률', score: () => `${formatPercentString(OVERVIEW_EVALUATION.retentionRate)}%` },
    {
        label: '조회수',
        score: () => formatKoreanNumber(OVERVIEW_EVALUATION.viewCount.current),
        avg: {
            topic: OVERVIEW_EVALUATION.viewCount.topicAvgScore,
            channel: OVERVIEW_EVALUATION.viewCount.channelAvgScore,
        },
    },
    {
        label: '좋아요',
        score: () => OVERVIEW_EVALUATION.likeCount.current.toLocaleString('ko-KR'),
        avg: {
            topic: OVERVIEW_EVALUATION.likeCount.topicAvgScore,
            channel: OVERVIEW_EVALUATION.likeCount.channelAvgScore,
        },
    },
    {
        label: '댓글',
        score: () => OVERVIEW_EVALUATION.commentCount.current.toLocaleString('ko-KR'),
        avg: {
            topic: OVERVIEW_EVALUATION.commentCount.topicAvgScore,
            channel: OVERVIEW_EVALUATION.commentCount.channelAvgScore,
        },
    },
]

export const Evaluation = () => {
    return (
        <TitledSection title="영상 평가">
            <div className="grid grid-cols-3 gap-3">
                {evaluationItems.map(({ label, score, avg }) => (
                    <EvaluationCard key={label} label={label} score={score()}>
                        {avg && <AverageScore topicAvg={avg.topic} channelAvg={avg.channel} />}
                    </EvaluationCard>
                ))}
            </div>
        </TitledSection>
    )
}

const EvaluationCard = ({ label, score, children }: PropsWithChildren<{ label: string; score: string }>) => {
    return (
        <div className="whitespace-nowrap px-4 py-6 space-y-2 border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-hidden">
            <h3 className="text-[14px] leading-[140%] tracking-[-0.35px] text-gray-700">{label}</h3>
            <p className="text-[24px] font-bold leading-[140%]">{score}</p>
            {children && <div className="mt-6">{children}</div>}
        </div>
    )
}

const AverageScore = ({ topicAvg, channelAvg }: { topicAvg: number; channelAvg: number }) => {
    const averageBlock = (label: string, value: number) => (
        <div>
            <h5 className="text-[14px] leading-[140%] tracking-[-0.35px] text-gray-500">{label}</h5>
            <p className="text-[14px] leading-[140%] tracking-[-0.35px] text-primary-500">
                {formatPercentString(value, 2)}%
            </p>
        </div>
    )

    return (
        <div className="flex flex-row gap-2">
            {averageBlock('Topic Avg', topicAvg)}
            <span className="border-l border-gray-200" />
            {averageBlock('Channel Avg', channelAvg)}
        </div>
    )
}

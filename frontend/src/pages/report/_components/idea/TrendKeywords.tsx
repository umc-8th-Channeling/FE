import { formatRelativeTime } from '../../../../utils/format'
import { TitledSection } from '../TitledSection'
import ScoreUp from '../../../../assets/icons/up.svg?react'
import type { IdeaDataProps, Trend } from '../../../../types/report/all'

const body18m = 'text-[16px] tablet:text-[18px] font-medium leading-[150%] tracking-[-0.45px]'
const body16m = 'text-[14px] tablet:text-[16px] font-medium leading-[150%] tracking-[-0.4px]'
const title18b = 'text-[14px] tablet:text-[18px] font-bold leading-[140%] tracking-[-0.45px]'
const body16r = 'text-[12px] tablet:text-[16px] leading-[150%] tracking-[-0.4px]'

export const TrendKeywords = ({ data }: IdeaDataProps) => {
    const { trend } = data

    const realTimeTrends = trend.filter((item) => item.keywordType === 'REAL_TIME')
    const channelTrends = trend.filter((item) => item.keywordType === 'CHANNEL')

    return (
        <TitledSection title="트렌드 키워드">
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                <KeywordBox label="🔥 실시간" items={realTimeTrends} />
                <KeywordBox label="✨ 내 채널 맞춤형" items={channelTrends} />
            </div>
        </TitledSection>
    )
}

const KeywordBox = ({ label, items }: { label: string; items: Trend[] }) => {
    return (
        <div className="overflow-hidden whitespace-nowrap p-4 space-y-4 rounded-lg border border-gray-200 bg-surface-elevate-l1">
            {/* header */}
            <div className="overflow-hidden grid grid-cols-6 tablet:grid-cols-8 items-center">
                <h3 className={`col-span-3 tablet:col-span-5 ${body18m}`}>{label}</h3>
                <h6 className={`text-gray-700 ${body16m}`}>시작일</h6>
                <h6 className={`col-span-2 flex items-center justify-end pr-2 text-gray-700 ${body16m}`}>
                    트렌드 점수
                </h6>
            </div>

            {/* keyword items */}
            <div className="space-y-2">
                {!items || items.length === 0 ? (
                    <p className="w-full p-10 text-center text-gray-600">키워드 데이터가 없습니다</p>
                ) : (
                    items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-6 tablet:grid-cols-8 items-center py-4 rounded-lg bg-surface-elevate-l2"
                        >
                            <p
                                className={`h-6 overflow-hidden text-ellipsis col-span-3 tablet:col-span-5 mx-4 ${title18b}`}
                            >
                                {item.keyword}
                            </p>
                            <p className={`text-gray-600 ${body16r}`}>{formatRelativeTime(item.createdAt)}</p>
                            <p
                                className={`col-span-2 flex flex-row items-center justify-end pr-2 text-primary-500 ${body16r}`}
                            >
                                +{item.score.toLocaleString()}% <ScoreUp />
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

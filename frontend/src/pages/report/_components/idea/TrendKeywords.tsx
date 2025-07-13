import { formatPercentString, formatRelativeTime } from '../../../../utils/format'
import { IDEA_TREND } from '../../dummy'
import { TitledSection } from '../TitledSection'
import ScoreUp from '../../../../assets/icons/up.svg?react'

const body18m = 'text-[18px] font-medium leading-[150%] tracking-[-0.45px]'
const body16m = 'text-[16px] font-medium leading-[150%] tracking-[-0.4px]'
const title18b = 'text-[18px] font-bold leading-[140%] tracking-[-0.45px]'
const body16r = 'text-[16px] leading-[150%] tracking-[-0.4px]'

const KeywordBox = ({ label, items }: { label: string; items: typeof IDEA_TREND }) => {
    return (
        <div className="overflow-hidden whitespace-nowrap p-4 space-y-4 rounded-lg border border-gray-200 bg-surface-elevate-l1">
            {/* header */}
            <div className="overflow-hidden grid grid-cols-6 items-center">
                <h3 className={`col-span-4 ${body18m}`}>{label}</h3>
                <h6 className={`text-gray-700 ${body16m}`}>시작일</h6>
                <h6 className={`min-w-[94px] flex justify-end pr-4 text-gray-700 ${body16m}`}>트렌드 점수</h6>
            </div>

            {/* keyword items */}
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="overflow-hidden grid grid-cols-6 items-center py-4 rounded-lg bg-surface-elevate-l2"
                    >
                        <p className={`col-span-4 ml-4 ${title18b}`}>{item.keyword}</p>
                        <p className={`text-gray-600 ${body16r}`}>{formatRelativeTime(item.updatedAt)}</p>
                        <p className={`min-w-[94px] flex flex-row justify-end mr-4 text-primary-500 ${body16r}`}>
                            +{formatPercentString(item.score)}% <ScoreUp />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const TrendKeywords = () => {
    return (
        <TitledSection title="트렌드 키워드">
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                <KeywordBox label="🔥 실시간" items={IDEA_TREND} />
                <KeywordBox label="✨ 내 채널 맞춤형" items={IDEA_TREND} />
            </div>
        </TitledSection>
    )
}

import { TitledSection } from '../TitledSection'
import { OVERVIEW_SUMMARY } from '../../dummy'

export const Summary = () => {
    return (
        <TitledSection title="영상 요약">
            <div className="p-6 border border-gray-200 rounded-lg bg-surface-elevate-l1 overflow-y-auto">
                <p
                    className="
                        overflow-y-auto h-[248px] whitespace-pre-line text-[14px] leading-[150%] tracking-[-0.35px] 
                        tablet:text-[16px] tablet:tracking-[-0.4px]
                    "
                >
                    {OVERVIEW_SUMMARY}
                </p>
            </div>
        </TitledSection>
    )
}

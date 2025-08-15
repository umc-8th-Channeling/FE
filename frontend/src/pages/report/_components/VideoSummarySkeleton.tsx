import { BaseSkeleton } from '../../../components/Skeleton'

export const VideoSummarySkeleton = () => {
    return (
        <div className="flex flex-col tablet:flex-row gap-6">
            <BaseSkeleton sizeConfig="w-[282px] h-full aspect-[141/79] rounded-lg" />

            <div className="space-y-2">
                <BaseSkeleton sizeConfig="w-[84px] h-[32px] rounded-lg" />
                <div className="space-y-2">
                    <BaseSkeleton sizeConfig="w-80 h-[36px] rounded-lg" />
                    <BaseSkeleton sizeConfig="w-70 h-12 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

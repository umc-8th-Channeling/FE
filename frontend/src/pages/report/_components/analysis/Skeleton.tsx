import { BaseSkeleton, TitledSkeleton } from '../../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div className="space-y-16">
            <TitledSkeleton titleSizeConfig="w-[127px] h-[28px]">
                <BaseSkeleton sizeConfig="w-full min-h-[528px]" />
            </TitledSkeleton>
            <TitledSkeleton titleSizeConfig="w-[127px] h-[28px]">
                <BaseSkeleton sizeConfig="w-full min-h-[528px]" />
            </TitledSkeleton>
        </div>
    )
}

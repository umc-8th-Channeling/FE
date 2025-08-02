import { BaseSkeleton } from '../../../../components/Skeleton'

export const ConceptboxSkeleton = () => {
    return (
        <>
            <div className=" w-full">
                <div className="flex justify-between h-[28px]">
                    <BaseSkeleton sizeConfig="w-[72px] h-[28px]" />
                    <BaseSkeleton sizeConfig="w-[56px] h-[24px]" />
                </div>
                <div className="mt-[16px]">
                    <BaseSkeleton sizeConfig="w-full min-w-[240px] tablet:min-w-[540px] desktop:min-w-[744px] min-h-30 p-4 space-y-6" />
                </div>
            </div>
        </>
    )
}

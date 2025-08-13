import { BaseSkeleton } from '../../../../components/Skeleton'

export const TargetboxSkeleton = () => {
    return (
        <>
            <div className="w-full">
                <div className="flex justify-between h-[28px]">
                    <BaseSkeleton sizeConfig="w-[89px] h-[28px]" />
                    <BaseSkeleton sizeConfig="w-[56px] h-[24px]" />
                </div>
                <div className="mt-[16px]">
                    <BaseSkeleton sizeConfig="flex w-full p-[16px] px-2 w-full h-fit min-h-[56px]" />
                </div>
            </div>
        </>
    )
}

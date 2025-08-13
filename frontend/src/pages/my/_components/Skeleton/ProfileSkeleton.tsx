import { BaseSkeleton, CircleSkeleton } from '../../../../components/Skeleton'

export const ProfileSkeleton = () => {
    return (
        <div className="flex w-full min-w-0 h-[200px] items-center gap-[24px] ">
            <CircleSkeleton circleSizeConfig="w-full max-w-[180px] aspect-square rounded-full object-cover" />
            <div className="flex flex-col items-start gap-[8px]  ">
                <BaseSkeleton sizeConfig="w-[100px] h-[28px]" />
                <BaseSkeleton sizeConfig="w-[82px] h-[34px]" />
                <BaseSkeleton sizeConfig="w-[174px] h-[24px]" />
                <BaseSkeleton sizeConfig="w-[131px] h-[24px]" />
            </div>
        </div>
    )
}

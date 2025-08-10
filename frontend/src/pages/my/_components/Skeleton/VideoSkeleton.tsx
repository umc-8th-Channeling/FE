import { BaseSkeleton, TitledSkeleton } from '../../../../components/Skeleton'

export const VideoSkeleton = () => {
    return (
        <div className="flex flex-col w-full items-start content-start pb-[80px] gap-[16px]">
            <TitledSkeleton titleSizeConfig="w-[89px] h-[28px]">
                <div className="flex items-center gap-4">
                    <BaseSkeleton sizeConfig="w-[165px] h-[41px] " />
                </div>
            </TitledSkeleton>

            <div className="grid grid-cols-2 desktop:grid-cols-4 w-full desktop:min-h-[744px] min-h-[1560px] self-stretch gap-4 tablet:gap-6 cursor-pointer">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-y-2">
                        <BaseSkeleton sizeConfig="max-w-[282px] h-[158px]" />
                        <TitledSkeleton titleSizeConfig="h-[25px] max-w-[282px]" />
                    </div>
                ))}
            </div>
        </div>
    )
}

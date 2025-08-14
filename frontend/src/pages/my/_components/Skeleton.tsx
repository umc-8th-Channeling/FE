import { BaseSkeleton } from '../../../components/Skeleton'
import { ConceptboxSkeleton } from './Skeleton/ConceptboxSkeleton'
import { ProfileSkeleton } from './Skeleton/ProfileSkeleton'
import { TargetboxSkeleton } from './Skeleton/TargetboxSkeleton'
import { VideoSkeleton } from './Skeleton/VideoSkeleton'

export const Skeleton = () => {
    return (
        <div className="flex w-full desktop:px-[76px] px-6 tablet:px-[90px] desktop:pt-[80px] pt-[40px] ">
            <div className="flex flex-col w-full gap-[40px] items-start ">
                <div className="flex flex-col desktop:flex-row w-full justify-between items-start space-y-6 ">
                    <div className="flex w-full items-center">
                        <ProfileSkeleton />
                    </div>
                    {/* 스탯카드 Skeleton */}
                    <div className="grid grid-cols-3 gap-3 tablet:gap-6 w-full">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <BaseSkeleton key={i} sizeConfig="flex w-full desktop:min-w-[180px] h-[98px] " />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full items-start gap-10">
                    <TargetboxSkeleton />
                    <ConceptboxSkeleton />
                </div>
                <div className="flex items-start content-start self-stretch flex-wrap">
                    <VideoSkeleton />
                </div>
            </div>
        </div>
    )
}

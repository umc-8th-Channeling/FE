import { BaseSkeleton } from '../../../components/Skeleton'

export const IdeaSkeleton = () => {
    return (
        <>
            <div className="flex">
                <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px]">아이디어를 불러오는 중...</p>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-1 gap-6">
                <BaseSkeleton sizeConfig="w-full h-40" />
                <BaseSkeleton sizeConfig="w-full h-40" />
                <BaseSkeleton sizeConfig="w-full h-40" />
                <BaseSkeleton sizeConfig="w-full h-40" />
                <BaseSkeleton sizeConfig="w-full h-40" />
                <BaseSkeleton sizeConfig="w-full h-40" />
            </div>
        </>
    )
}

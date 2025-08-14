import { BaseSkeleton } from '../../../../components/Skeleton'

export const CommentSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <BaseSkeleton sizeConfig="w-full h-10" />
            <BaseSkeleton sizeConfig="w-full h-10" />
            <BaseSkeleton sizeConfig="w-full h-16" />
            <BaseSkeleton sizeConfig="w-full h-16" />
            <BaseSkeleton sizeConfig="w-full h-10" />
        </div>
    )
}

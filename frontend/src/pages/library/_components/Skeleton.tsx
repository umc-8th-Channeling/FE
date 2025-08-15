import { BaseSkeleton } from '../../../components/Skeleton'

export const Skeleton = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <BaseSkeleton sizeConfig="w-40 h-10" />
                <BaseSkeleton sizeConfig="w-50 h-10" />
            </div>

            <div className="grid grid-cols-2 desktop:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, idx) => (
                    <BaseSkeleton key={idx} sizeConfig="w-full h-44" />
                ))}
            </div>
        </div>
    )
}

import { BaseSkeleton } from '../../../components/Skeleton'

export const ReportSkeleton = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-row gap-2">
                    <BaseSkeleton sizeConfig="w-[72px] h-10" />
                    <BaseSkeleton sizeConfig="w-[72px] h-10" />
                </div>
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

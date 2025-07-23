interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
    <div className="flex w-full desktop:min-w-[180px] h-[98px] p-4 items-start gap-[16px] rounded-[8px] bg-[#262626] border border-gray-200">
        <div className="flex flex-col items-start gap-[8px]">
            <div className="flex justify-center items-center gap-[4px]">
                <div>{icon}</div>
                <div className="text-gray-700 text-[12px] tablet:text-[14px] leading-[140%] tracking-[-0.35px] whitespace-nowrap">
                    {title}
                </div>
            </div>
            <div className="text-gray-900 text-[20px] tablet:text-[24px] font-bold leading-[140%] tracking-[-0.6px] whitespace-nowrap">
                {value}
            </div>
        </div>
    </div>
)

export default StatsCard

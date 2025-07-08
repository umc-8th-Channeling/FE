interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
    <div className="w-[180px] h-[98px] bg-[#262626] rounded-[8px] p-4 flex flex-col justify-between border border-gray-200">
        <div className="flex  items-center gap-[4px]">
            <div>{icon}</div>
            <div className="flex items-center gap-2 text-gray-600 text-[14px]">{title}</div>
        </div>

        <div className="text-gray-900 text-[24px] font-bold">{value}</div>
    </div>
)

export default StatsCard

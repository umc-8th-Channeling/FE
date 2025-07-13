import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip)

interface DoughnutChartProps {
    labels: string[]
    data: number[]
}

export const DoughnutChart = ({ labels, data }: DoughnutChartProps) => {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: '#fa4d5680',
                hoverBackgroundColor: '#fa4d56',
                borderColor: '#262626',
                borderWidth: 8,
                borderRadius: 8,
                radius: '90%', // 평상시 반경 (도넛 외곽 기준)
                hoverRadius: '100%', // hover 시 반경
            },
        ],
    }

    const options = {
        responsive: true,
        cutout: '50%',
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    return (
        <div className="size-full">
            <Doughnut data={chartData} options={options} />
        </div>
    )
}

import { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ScriptableContext, type ChartEvent } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import type { TabItem } from '../../types/common'
import { iconDefaultPlugin, iconActivePlugin } from './iconPlugin'
import { tooltipExternalHandler } from './tooltipHandler'
import './tooltip.css'

ChartJS.register(ArcElement, Tooltip, ChartDataLabels, Legend)

type Color = string | CanvasGradient | CanvasPattern
type AnyObject = Record<string, unknown>

interface DoughnutChartProps {
    data: number[]
    tabs: TabItem[]
    activeIndex: number
    onClickSegment?: (tab: TabItem) => void
}

export const DoughnutChart = ({ data, tabs, activeIndex, onClickSegment }: DoughnutChartProps) => {
    const chartRef = useRef<ChartJS<'doughnut', number[], unknown> | null>(null)

    const labels = tabs.map((tab) => tab.label) // tabs에서 label 데이터 추출

    // 비활성화 segment
    const defaultData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: (ctx: ScriptableContext<'doughnut'>) =>
                    ctx.dataIndex === activeIndex ? '#ff000000' : '#fa4d5680', // 활성화 segment는 투명
                hoverBackgroundColor: (ctx: ScriptableContext<'doughnut'>, _options: AnyObject) =>
                    typeof ctx.dataset.backgroundColor === 'function'
                        ? (ctx.dataset.backgroundColor(ctx, _options) as Color)
                        : (ctx.dataset.backgroundColor as Color),
                borderColor: '#262626',
                hoverBorderColor: '#262626',
                borderWidth: 8,
                borderRadius: 8,
                radius: '90%',
            },
        ],
    }

    // 활성화 segment
    const activeData = {
        ...defaultData,
        datasets: defaultData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: (ctx: ScriptableContext<'doughnut'>) =>
                (ctx.dataIndex === activeIndex ? '#fa4d56' : '#ff000000') as Color, // 비활성화 segment는 투명
            radius: '100%',
        })),
    }

    const options = {
        responsive: true,
        cutout: '50%',
        plugins: {
            legend: { display: false },
            datalabels: { display: false },
            tooltip: { enabled: false, external: tooltipExternalHandler, intersect: true }, // 정확도를 낮추고 싶으면 false로 변경
            iconPlugin: { activeIndex },
        },
        onClick: (evt: ChartEvent) => {
            if (!chartRef.current) return
            const points = chartRef.current.getElementsAtEventForMode(
                evt as unknown as Event,
                'nearest',
                { intersect: true },
                true
            )

            if (points.length) {
                const index = points[0].index
                chartRef.current.update()
                if (onClickSegment) onClickSegment(tabs[index])
            }
        },
    }

    return (
        <div className="relative size-full cursor-pointer">
            <Doughnut ref={chartRef} data={defaultData} options={options} plugins={[iconDefaultPlugin]} />
            <div className="absolute inset-0">
                <Doughnut data={activeData} options={{ ...options, cutout: '48%' }} plugins={[iconActivePlugin]} />
            </div>
        </div>
    )
}

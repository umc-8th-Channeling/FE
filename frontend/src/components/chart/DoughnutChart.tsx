import { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, type ScriptableContext, type ChartEvent } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { iconDefaultPlugin, iconActivePlugin } from './iconPlugin'
import { activeTooltipPlugin, externalTooltipHandler } from './tooltipPlugins'
import './tooltip.css'
import type { CommentTypeValue } from '../../types/report/comment'

ChartJS.register(ArcElement, Tooltip)

type Color = string | CanvasGradient | CanvasPattern
type AnyObject = Record<string, unknown>

export interface CustomPluginsOptions {
    customPlugin?: { activeIndex?: number }
}

interface DoughnutChartProps {
    data: number[]
    labels: CommentTypeValue[]
    activeIndex: number
    onClickSegment?: (index: number) => void
}

export const DoughnutChart = ({ data, labels, activeIndex, onClickSegment }: DoughnutChartProps) => {
    const chartRef = useRef<ChartJS<'doughnut', number[], unknown> | null>(null)

    const defaultData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: (ctx: ScriptableContext<'doughnut'>) =>
                    ctx.dataIndex === activeIndex ? '#ff000000' : '#fa4d5680',
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

    const activeData = {
        ...defaultData,
        datasets: defaultData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: (ctx: ScriptableContext<'doughnut'>) =>
                (ctx.dataIndex === activeIndex ? '#fa4d56' : '#ff000000') as Color,
            radius: '100%',
        })),
    }

    const options = {
        responsive: true,
        cutout: '45%',
        plugins: {
            legend: { display: false },
            datalabels: { display: false },
            tooltip: { enabled: false, external: externalTooltipHandler, intersect: true }, // 정확도를 낮추고 싶으면 false로 변경
            customPlugin: { activeIndex },
        },
        onClick: (evt: ChartEvent) => {
            if (!chartRef.current || !onClickSegment) return
            const points = chartRef.current.getElementsAtEventForMode(
                evt as unknown as Event,
                'nearest',
                { intersect: true },
                true
            )

            if (points.length) {
                const index = points[0].index
                if (onClickSegment) onClickSegment(index)
            }
        },
    }

    return (
        <div className="chartjs-tooltip-container relative size-full cursor-pointer">
            <Doughnut ref={chartRef} data={defaultData} options={options} plugins={[iconDefaultPlugin]} />
            <div className="absolute inset-0">
                <Doughnut
                    data={activeData}
                    options={{ ...options, cutout: '43%' }}
                    plugins={[iconActivePlugin, activeTooltipPlugin]}
                />
            </div>
        </div>
    )
}

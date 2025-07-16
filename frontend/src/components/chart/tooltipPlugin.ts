import type { ArcElement, Chart, TooltipModel } from 'chart.js'
import { type CustomPluginsOptions } from './DoughnutChart'
import bubbleSVG from '../../assets/icons/chart/bubble.svg'

/**
 * 해당 ID의 툴팁 요소가 존재하지 않으면 새로 생성하여 반환
 * DOM에 툴팁을 하나만 유지하면서 재사용
 */
function getOrCreateTooltipEl(id = 'chartjs-tooltip') {
    let tooltipEl = document.getElementById(id) as HTMLDivElement | null
    if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.id = id
        tooltipEl.className = 'custom-tooltip'
        document.body.appendChild(tooltipEl)
    }
    return tooltipEl
}

/**
 * 도넛 차트의 특정 Arc(세그먼트)의 중심 위치를 계산하여,
 * 툴팁의 정확한 위치를 반환
 */
function calculateTooltipPosition(
    chartArea: Chart<'doughnut'>['chartArea'],
    arc: ArcElement,
    canvas: HTMLCanvasElement
) {
    const centerX = (chartArea.left + chartArea.right) / 2
    const centerY = (chartArea.top + chartArea.bottom) / 2
    const angle = (arc.startAngle + arc.endAngle) / 2
    const radius = (arc.innerRadius + arc.outerRadius) / 2

    const tooltipX = centerX + Math.cos(angle) * radius
    const tooltipY = centerY + Math.sin(angle) * radius

    const canvasRect = canvas.getBoundingClientRect()
    return {
        left: canvasRect.left + window.scrollX + tooltipX,
        top: canvasRect.top + window.scrollY + tooltipY,
    }
}

/**
 * 툴팁 DOM 요소에 내용을 삽입 (라벨 + 퍼센트 + 말풍선 배경 이미지)
 */
function setTooltipContent(
    tooltipEl: HTMLDivElement,
    label: string | undefined,
    percentRounded: string,
    bubbleSVG: string
) {
    tooltipEl.innerHTML = `
        <div class="tooltip-body" role="tooltip" aria-label="${label} 비율은 ${percentRounded}%입니다">
            <div class="tooltip-content">
                <div class="tooltip-percent">${percentRounded}%</div>
                <div class="tooltip-label">${label}</div>   
            </div>
            <img src="${bubbleSVG}" alt="말풍선 배경" class="tooltip-bubble" />
        </div>
    `
}

export const activeTooltipPlugin = {
    id: 'activeTooltipPlugin',

    /**
     * 차트가 그려진 후 active 세그먼트의 고정 툴팁을 출력하는 커스텀 플러그인
     * 조건: activeIndex로 선택된 segment이고, 퍼센트가 6% 이하인 경우만 표시
     */
    afterDraw(chart: Chart<'doughnut'>) {
        const activeIndex = (chart.options.plugins as CustomPluginsOptions).customPlugin?.activeIndex
        const dataset = chart.data.datasets[0]
        const meta = chart.getDatasetMeta(0)

        if (typeof activeIndex !== 'number') return

        const arc = meta.data[activeIndex] as ArcElement
        if (!arc || typeof dataset.data[activeIndex] !== 'number') return

        const value = dataset.data[activeIndex] as number
        const total = dataset.data.reduce((a, b) => Number(a) + Number(b), 0)
        const percent = (value / total) * 100
        const percentRounded = percent.toFixed(0)
        const label = chart.data.labels?.[activeIndex] as string

        const { chartArea, canvas } = chart
        const tooltipEl = getOrCreateTooltipEl('chartjs-active-tooltip')

        if (percent > 6) {
            tooltipEl.style.opacity = '0'
            tooltipEl.innerHTML = `<div></div>`
        } else {
            setTooltipContent(tooltipEl, label, percentRounded, bubbleSVG)
            tooltipEl.style.opacity = '1'
        }

        const pos = calculateTooltipPosition(chartArea, arc, canvas)
        tooltipEl.style.left = pos.left - tooltipEl.offsetWidth / 2 + 'px'
        tooltipEl.style.top = pos.top - tooltipEl.offsetHeight + 5 + 'px'
    },
}

interface TooltipContext {
    chart: Chart
    tooltip: TooltipModel<'doughnut'>
}

/**
 * Chart.js의 external tooltip handler.
 * 마우스 hover에 따라 툴팁이 동적으로 나타나고 사라짐.
 * 퍼센트가 6%를 초과하면 표시하지 않음.
 */
export const tooltipHandler = (context: TooltipContext) => {
    const { chart, tooltip } = context

    const tooltipEl = getOrCreateTooltipEl()

    if (!tooltip || tooltip.opacity === 0 || tooltip.dataPoints.length === 0) {
        tooltipEl.style.opacity = '0'
        return
    }

    const item = tooltip.dataPoints[0]
    const arc = item.element as ArcElement
    const value = item.raw as number
    const total = item.dataset.data.reduce((a: number, b: number) => a + b, 0)
    const percent = (value / total) * 100

    if (percent > 6) {
        tooltipEl.style.opacity = '0'
        return
    }

    const percentRounded = percent.toFixed(0)
    const label = item.label

    setTooltipContent(tooltipEl, label, percentRounded, bubbleSVG)

    const { left, top } = calculateTooltipPosition(chart.chartArea, arc, chart.canvas)

    tooltipEl.style.opacity = '1'
    tooltipEl.style.left = `${left - tooltipEl.offsetWidth / 2}px`
    tooltipEl.style.top = `${top - tooltipEl.offsetHeight + 5}px`
}

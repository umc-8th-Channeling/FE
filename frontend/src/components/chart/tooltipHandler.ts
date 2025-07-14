import type { ArcElement, Chart, TooltipModel } from 'chart.js'

import bubbleSVG from '../../assets/icons/chart/bubble.svg'

interface TooltipContext {
    chart: Chart
    tooltip: TooltipModel<'doughnut'>
}

export const tooltipExternalHandler = (context: TooltipContext) => {
    const tooltip = context.tooltip

    const chart = context.chart
    const chartArea = chart.chartArea
    const centerX = (chartArea.left + chartArea.right) / 2
    const centerY = (chartArea.top + chartArea.bottom) / 2

    let tooltipEl = document.getElementById('chartjs-custom-tooltip') as HTMLDivElement

    if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.id = 'chartjs-custom-tooltip'
        tooltipEl.className = 'custom-tooltip'
        document.body.appendChild(tooltipEl)
    }

    if (!tooltip || tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0'
        tooltipEl.style.transform = 'translateY(8px)'
        return
    }

    const item = tooltip.dataPoints[0]
    const value = item.raw as number
    const total = item.dataset.data.reduce((a: number, b: number) => a + b, 0)
    const percent = (value / total) * 100

    if (percent > 6) {
        tooltipEl.style.opacity = '0'
        tooltipEl.style.transform = 'translateY(8px)'
        return
    }

    const arc = item.element as ArcElement

    const startAngle = arc.startAngle
    const endAngle = arc.endAngle
    const angle = (startAngle + endAngle) / 2 // 세그먼트의 중앙 각도

    const innerRadius = arc.innerRadius
    const outerRadius = arc.outerRadius
    const radius = (innerRadius + outerRadius) / 2 // 외각 반지름과 내각 반지름의 평균

    // canvas 기준 중심 좌표
    const tooltipX = centerX + Math.cos(angle) * radius
    const tooltipY = centerY + Math.sin(angle) * radius

    const label = item.label
    const percentRounded = percent.toFixed(0)

    tooltipEl.innerHTML = `
        <div class="tooltip-body role="tooltip" aria-label="${label} 비율은 ${percentRounded}%입니다">
            <div class="tooltip-content">
                <div class="tooltip-percent">${percentRounded}%</div>
                <div class="tooltip-label">${label}</div>   
            </div>
            <img src="${bubbleSVG}" alt="말풍선 배경" class="tooltip-bubble" />
        </div>
    `

    // 툴팁 위치 조정
    const canvasRect = chart.canvas.getBoundingClientRect()

    tooltipEl.style.opacity = '1'
    tooltipEl.style.transform = 'translateY(0px)'
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.left = canvasRect.left + window.scrollX + tooltipX - tooltipEl.offsetWidth / 2 + 'px'
    tooltipEl.style.top = canvasRect.top + window.scrollY + tooltipY - tooltipEl.offsetHeight + 5 + 'px'
    tooltipEl.style.pointerEvents = 'none'
}

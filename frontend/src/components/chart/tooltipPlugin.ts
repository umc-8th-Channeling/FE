import type { ArcElement, Chart, TooltipModel } from 'chart.js'
import { type CustomPluginsOptions } from './DoughnutChart'
import bubbleSVG from '../../assets/icons/chart/bubble.svg'

/**
 * 해당 ID의 툴팁 요소가 존재하지 않으면 새로 생성하여 반환
 * DOM에 툴팁을 하나만 유지하면서 재사용하기 위함
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
 * @param chartArea 차트의 위치와 크기 정보
 * @param arc 세그먼트(도넛 조각)의 정보 (ex. 시작 각도, 반지름 등)
 * @param canvas 캔버스 요소
 */
function calculateTooltipPosition(
    chartArea: Chart<'doughnut'>['chartArea'],
    arc: ArcElement,
    canvas: HTMLCanvasElement
) {
    const centerX = (chartArea.left + chartArea.right) / 2 // 차트 영역의 중앙 X 좌표
    const centerY = (chartArea.top + chartArea.bottom) / 2 // 차트 영역의 중앙 Y 좌표
    const angle = (arc.startAngle + arc.endAngle) / 2 // 세그먼트의 중심 각도
    const radius = (arc.innerRadius + arc.outerRadius) / 2 // 세그먼트의 평균 반지름

    const tooltipX = centerX + radius * Math.cos(angle)
    const tooltipY = centerY + radius * Math.sin(angle)

    const canvasRect = canvas.getBoundingClientRect() // 캔버스의 위치와 크기 정보
    return {
        // 캔버스 기준 툹팁 위치 반환
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

        const arc = meta.data[activeIndex] as ArcElement // 차트 세그먼트
        if (!arc || typeof dataset.data[activeIndex] !== 'number') return

        const value = dataset.data[activeIndex] as number // 세그먼트의 값 (ex. 0.123)
        const total = dataset.data.reduce((a, b) => Number(a) + Number(b), 0) // 전체 값의 합
        const percent = (value / total) * 100 // 세그먼트의 퍼센트 (ex. 12.3%)
        const percentRounded = percent.toFixed(0) // 퍼센트를 소수점 없이 정수로 변환 (ex. 12%)
        const label = chart.data.labels?.[activeIndex] as string // 세그먼트의 라벨 (ex. '긍정')

        const { chartArea, canvas } = chart // 차트 영역과 캔버스 요소
        const tooltipEl = getOrCreateTooltipEl('chartjs-active-tooltip') // 툴팁 DOM 요소 가져오기

        if (percent > 6) {
            tooltipEl.style.opacity = '0'
            tooltipEl.innerHTML = `<div></div>`
        } else {
            setTooltipContent(tooltipEl, label, percentRounded, bubbleSVG) // 툴팁 DOM 요소 업데이트
            tooltipEl.style.opacity = '1'
        }

        const pos = calculateTooltipPosition(chartArea, arc, canvas) // 툴팁 위치 계산
        tooltipEl.style.left = pos.left - tooltipEl.offsetWidth / 2 + 'px' // 중앙 정렬
        tooltipEl.style.top = pos.top - tooltipEl.offsetHeight + 5 + 'px' // 약간 위로 이동
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
export const externalTooltipHandler = (context: TooltipContext) => {
    const { chart, tooltip } = context // Chart.js의 툴팁 모델에서 tooltip과 chart를 추출
    const tooltipEl = getOrCreateTooltipEl()

    // 툴팁이 비활성화되거나 데이터 포인트가 없으면 툴팁 숨김
    if (!tooltip || tooltip.opacity === 0 || tooltip.dataPoints.length === 0) {
        tooltipEl.style.opacity = '0'
        return
    }

    const item = tooltip.dataPoints[0]
    const arc = item.element as ArcElement // 차트 세그먼트
    const value = item.raw as number // 세그먼트의 값 (ex. 0.123)
    const total = item.dataset.data.reduce((a: number, b: number) => a + b, 0) // 전체 값의 합
    const percent = (value / total) * 100 // 세그먼트의 퍼센트 (ex. 12.3%)
    const percentRounded = percent.toFixed(0) // 퍼센트를 소수점 없이 정수로 변환 (ex. 12%)
    const label = item.label // 세그먼트의 라벨 (ex. '긍정')

    if (percent > 6) {
        // 퍼센트가 6%를 초과하면 툴팁 숨김
        tooltipEl.style.opacity = '0'
        return
    }

    setTooltipContent(tooltipEl, label, percentRounded, bubbleSVG) // 툴팁 DOM 요소 업데이트

    const { left, top } = calculateTooltipPosition(chart.chartArea, arc, chart.canvas)

    tooltipEl.style.opacity = '1'
    tooltipEl.style.left = `${left - tooltipEl.offsetWidth / 2}px`
    tooltipEl.style.top = `${top - tooltipEl.offsetHeight + 5}px`
}

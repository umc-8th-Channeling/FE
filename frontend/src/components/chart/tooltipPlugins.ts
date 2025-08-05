import type { ArcElement, Chart, TooltipModel } from 'chart.js'
import { type CustomPluginsOptions } from './DoughnutChart'
import bubbleSVG from '../../assets/icons/chart/bubble.svg'

interface ChartWithTooltipHandler extends Chart<'doughnut'> {
    _activeTooltipHandler?: EventListenerOrEventListenerObject
}

interface TooltipContext {
    chart: Chart
    tooltip: TooltipModel<'doughnut'>
}

/**
 * 지정된 ID를 가진 툴팁 요소를 반환하거나,
 * 존재하지 않으면 새로 생성하여 반환합니다.
 *
 * DOM에 툴팁 요소를 하나만 유지하고 재사용하기 위해 사용됩니다.
 *
 * @param {string} id - 생성 또는 검색할 툴팁 요소의 ID (기본값: 'chartjs-tooltip')
 * @returns {HTMLDivElement | null} - 기존 또는 새로 생성된 툴팁 요소
 */
function getOrCreateTooltipEl(id = 'chartjs-tooltip') {
    const container = document.querySelector('.chartjs-tooltip-container')
    if (!container) return null

    let tooltipEl = document.getElementById(id) as HTMLDivElement | null
    if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.id = id
        tooltipEl.className = 'custom-tooltip'
        container.appendChild(tooltipEl)
    }

    return tooltipEl
}

/**
 * 도넛 차트의 특정 Arc(세그먼트)의 중심 위치를 계산하여,
 * 툴팁의 정확한 위치를 반환합니다.
 *
 * @param chartArea 차트의 위치와 크기 정보 (left, top, right, bottom)
 * @param arc 세그먼트(도넛 조각)의 정보 (ex. 시작 각도, 반지름 등)
 * @param canvas 캔버스 요소
 * @returns {{
 *   left: number;
 *   top: number;
 * } | null} 툴팁의 화면 좌표 (픽셀 단위). 컨테이너나 캔버스가 없으면 null을 반환합니다.
 */
function calculateTooltipPosition(
    chartArea: Chart<'doughnut'>['chartArea'],
    arc: ArcElement,
    canvas: HTMLCanvasElement
) {
    const container = document.querySelector('.chartjs-tooltip-container') as HTMLElement | null
    if (!container || !container.getBoundingClientRect || !document.body.contains(container)) return null
    if (!canvas || !canvas.getBoundingClientRect || !document.body.contains(canvas)) return null

    const containerRect = container.getBoundingClientRect()
    const canvasRect = canvas.getBoundingClientRect()

    const centerX = (chartArea.left + chartArea.right) / 2
    const centerY = (chartArea.top + chartArea.bottom) / 2
    const angle = (arc.startAngle + arc.endAngle) / 2
    const radius = (arc.innerRadius + arc.outerRadius) / 2

    const tooltipX = centerX + radius * Math.cos(angle)
    const tooltipY = centerY + radius * Math.sin(angle)

    return {
        left: tooltipX + (canvasRect.left - containerRect.left),
        top: tooltipY + (canvasRect.top - containerRect.top),
    }
}

/**
 * 해당 요소가 현재 뷰포트 안에 있는지 여부를 반환합니다.
 * @param el 확인할 HTML 요소
 * @returns boolean - 요소가 화면에 보이면 true, 아니면 false
 */
function isElementInViewport(el: HTMLElement | null): boolean {
    if (!el) return false

    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0
}

/**
 * 툴팁 위치를 계산해 DOM 요소를 업데이트합니다.
 * @param chart 차트 인스턴스
 * @param arc 선택된 ArcElement
 * @param tooltipEl 툴팁 DOM 요소
 */
function updateTooltipPosition(chart: Chart<'doughnut'>, arc: ArcElement, tooltipEl: HTMLElement) {
    const { chartArea, canvas } = chart
    if (!isElementInViewport(canvas)) return // 차트가 화면에 없으면 위치 계산 안 함

    const pos = calculateTooltipPosition(chartArea, arc, canvas)
    if (!pos) return

    tooltipEl.style.left = `${pos.left - tooltipEl.offsetWidth / 2}px`
    tooltipEl.style.top = `${pos.top - tooltipEl.offsetHeight + 5}px`
}

/**
 * 도넛 차트에 바인딩된 툴팁 관련 이벤트 핸들러를 해제합니다.
 *
 * Chart 인스턴스에 임시로 저장된 `_activeTooltipHandler`를 참조하여,
 * window 객체에 등록된 scroll 및 resize 이벤트 리스너를 제거합니다.
 *
 * @param chart 차트 인스턴스
 */
function unbindEvents(chart: Chart<'doughnut'>) {
    const handler = (chart as ChartWithTooltipHandler)._activeTooltipHandler
    if (handler) {
        window.removeEventListener('scroll', handler, true)
        window.removeEventListener('resize', handler)
    }
}

/**
 * scroll 또는 resize 이벤트 발생 시 툴팁 위치를 재계산하는 이벤트 리스너를 등록합니다.
 * @param chart 차트 인스턴스
 * @param arc 대상 ArcElement
 * @param tooltipEl 툴팁 DOM 요소
 */
function bindScrollAndResizeEvents(chart: Chart<'doughnut'>, arc: ArcElement, tooltipEl: HTMLElement) {
    unbindEvents(chart) // 기존 chart 인스턴스에 바인딩된 이벤트 리스너 제거

    let ticking = false // 중복 호출 방지 플래그
    let lastTop = 0,
        lastLeft = 0

    const handler = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const pos = calculateTooltipPosition(chart.chartArea, arc, chart.canvas)
                if (!pos) return

                const { left, top } = pos
                if (left !== lastLeft || top !== lastTop) {
                    tooltipEl.style.left = `${left - tooltipEl.offsetWidth / 2}px`
                    tooltipEl.style.top = `${top - tooltipEl.offsetHeight + 5}px`
                    lastLeft = left
                    lastTop = top
                }
                ticking = false
            })
            ticking = true
        }
    }

    window.addEventListener('scroll', handler, true)
    window.addEventListener('resize', handler)
}

/**
 * 툴팁 DOM 요소에 HTML 콘텐츠를 설정합니다.
 *
 * @param tooltipEl 툴팁이 렌더링될 DOM 요소
 * @param label 해당 도넛 세그먼트의 라벨
 * @param percentRounded 해당 항목의 백분율
 */
function setTooltipContent(tooltipEl: HTMLDivElement, label: string | undefined, percentRounded: string) {
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
        if (typeof activeIndex !== 'number') return

        const dataset = chart.data.datasets[0]
        const meta = chart.getDatasetMeta(0)
        const arc = meta.data[activeIndex] as ArcElement
        if (!arc || typeof dataset.data[activeIndex] !== 'number') return

        const value = dataset.data[activeIndex] as number
        const total = dataset.data.reduce((a, b) => Number(a) + Number(b), 0)
        const percent = (value / total) * 100
        const percentRounded = percent.toFixed(0)
        const label = chart.data.labels?.[activeIndex] as string

        const tooltipEl = getOrCreateTooltipEl('chartjs-active-tooltip')
        if (!tooltipEl) return

        if (percent > 6) {
            tooltipEl.innerHTML = `<div></div>`
            tooltipEl.style.opacity = '0'
            tooltipEl.style.display = 'none'

            unbindEvents(chart)
            return
        }

        setTooltipContent(tooltipEl, label, percentRounded)

        tooltipEl.style.opacity = '1'
        tooltipEl.style.display = 'block'
        updateTooltipPosition(chart, arc, tooltipEl)
        bindScrollAndResizeEvents(chart, arc, tooltipEl)
    },
}

/**
 * Chart.js의 external tooltip handler.
 * 마우스 hover에 따라 툴팁이 동적으로 나타나고 사라짐.
 * 퍼센트가 6%를 초과하면 표시하지 않음.
 */
export const externalTooltipHandler = (context: TooltipContext) => {
    const { chart, tooltip } = context // Chart.js의 툴팁 모델에서 tooltip과 chart를 추출

    const tooltipEl = getOrCreateTooltipEl()
    if (!tooltipEl) return

    if (!tooltip || tooltip.opacity === 0 || tooltip.dataPoints.length === 0) {
        tooltipEl.style.opacity = '0'
        tooltipEl.style.pointerEvents = 'none'
        return
    }

    const item = tooltip.dataPoints[0]
    const arc = item.element as ArcElement
    const value = item.raw as number
    const total = item.dataset.data.reduce((a: number, b: number) => a + b, 0)
    const percent = (value / total) * 100
    const percentRounded = percent.toFixed(0)
    const label = item.label

    if (percent > 6) {
        tooltipEl.style.opacity = '0'
        tooltipEl.style.pointerEvents = 'none'
        return
    }

    setTooltipContent(tooltipEl, label, percentRounded)

    const pos = calculateTooltipPosition(chart.chartArea, arc, chart.canvas)
    if (!pos) return

    tooltipEl.style.opacity = '1'
    tooltipEl.style.display = 'block'
    tooltipEl.style.left = `${pos.left - tooltipEl.offsetWidth / 2}px`
    tooltipEl.style.top = `${pos.top - tooltipEl.offsetHeight + 5}px`
}

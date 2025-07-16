import type { ArcElement, Chart } from 'chart.js'
import type { CustomPluginsOptions } from './DoughnutChart'
import positiveSVG from '../../assets/icons/chart/positive.svg'
import negativeSVG from '../../assets/icons/chart/negative.svg'
import neutralSVG from '../../assets/icons/chart/neutral.svg'
import suggestionSVG from '../../assets/icons/chart/suggestion.svg'

const icons = [positiveSVG, negativeSVG, neutralSVG, suggestionSVG].map((src) => {
    const img = new Image()
    img.src = src
    return img
})

export const iconDefaultPlugin = {
    id: 'iconPlugin',
    afterDraw(chart: Chart<'doughnut'>) {
        drawIconsPlugin(chart, undefined, false)
    },
}

export const iconActivePlugin = {
    id: 'iconPlugin',
    afterDraw(chart: Chart<'doughnut'>) {
        const pluginOptions = (chart.options.plugins as CustomPluginsOptions)?.customPlugin || {}
        const activeIndex = pluginOptions.activeIndex
        drawIconsPlugin(chart, activeIndex, true)
    },
}

/**
 * 도넛 그래프에서 6% 이상인 segment에 아이콘과 라벨을 그리는 함수입니다.
 *
 * @param chart - Chart.js 도넛 차트 인스턴스
 * @param activeIndex - 활성화된 세그먼트 인덱스 (선택적)
 * @param drawActiveOnly - 활성화된 세그먼트만 그릴지 여부 (기본값: false)
 */
function drawIconsPlugin(chart: Chart<'doughnut'>, activeIndex?: number, drawActiveOnly = false) {
    const ctx = chart.ctx
    const dataset = chart.data.datasets[0]
    const meta = chart.getDatasetMeta(0)

    const total = dataset.data.reduce((a: number, b: number) => a + b, 0)

    dataset.data.forEach((value: number, index: number) => {
        const percentage = (value / total) * 100
        if (percentage <= 6) return

        if (drawActiveOnly && index !== activeIndex) return

        const arc = meta.data[index] as ArcElement | undefined
        if (!arc) return

        const center = arc.getCenterPoint(true)
        const icon = icons[index % icons.length]
        const iconSize = drawActiveOnly ? 48 : 24

        drawLabelWithIcon(ctx, center.x, center.y, percentage, icon, iconSize, 14, drawActiveOnly)
    })
}

/**
 * 캔버스에 아이콘과 퍼센트 라벨을 그리는 함수입니다.
 *
 * @param ctx - 2D 캔버스 렌더링 컨텍스트
 * @param centerX - 아이콘과 라벨을 그릴 중심 X 좌표
 * @param centerY - 아이콘과 라벨을 그릴 중심 Y 좌표
 * @param percentage - 표시할 퍼센트 값 (숫자)
 * @param icon - 표시할 아이콘 이미지 객체
 * @param iconSize - 아이콘 크기 (픽셀)
 * @param labelFontSize - 라벨 폰트 크기 (기본값 14)
 * @param active - 활성화 여부에 따른 스타일 분기 (기본값 false)
 */
function drawLabelWithIcon(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    percentage: number,
    icon: HTMLImageElement,
    iconSize: number,
    labelFontSize = 14,
    active = false
) {
    const spacing = 4
    const labelText = `${Math.round(percentage)}%`
    const labelHeight = labelFontSize + 2
    const totalHeight = iconSize + spacing + labelHeight

    const baseY = centerY - totalHeight / 2

    if (!icon.complete) return

    // 아이콘 그리기
    ctx.drawImage(icon, centerX - iconSize / 2, baseY, iconSize, iconSize)

    // 텍스트 스타일링
    ctx.font = `500 ${labelFontSize}px Pretendard`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    if (!active) {
        // 기본 라벨
        ctx.fillStyle = '#f4f4f4'
        ctx.fillText(labelText, centerX, baseY + iconSize + spacing)
    } else {
        // 활성화 라벨 (배경 박스 + 테두리 + 텍스트)
        const paddingY = 4
        const paddingX = 8

        // 텍스트 너비
        const textWidth = ctx.measureText(labelText).width

        // 텍스트 박스 좌표 및 크기
        const rectX = centerX - textWidth / 2 - paddingX
        const rectY = baseY + iconSize + spacing
        const rectWidth = textWidth + paddingX * 2
        const rectHeight = labelHeight + paddingY * 2
        const radius = 16

        // 배경
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        roundRect(ctx, rectX, rectY - paddingY, rectWidth, rectHeight, radius)
        ctx.fill()

        // 테두리
        ctx.strokeStyle = '#ff8389'
        ctx.lineWidth = 1
        roundRect(ctx, rectX, rectY - paddingY, rectWidth, rectHeight, radius)
        ctx.stroke()

        // 텍스트
        const textY = rectY - paddingY + (rectHeight - labelHeight) / 2 + 2
        ctx.fillStyle = '#f4f4f4'
        ctx.fillText(labelText, centerX, textY)
    }
}

/**
 * 캔버스에 둥근 모서리 사각형 경로를 그리는 함수입니다.
 *
 * @param ctx - 2D 캔버스 렌더링 컨텍스트
 * @param x - 사각형 시작 x 좌표
 * @param y - 사각형 시작 y 좌표
 * @param width - 사각형 너비
 * @param height - 사각형 높이
 * @param radius - 둥근 모서리 반지름
 */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    if (width < 2 * radius) radius = width / 2
    if (height < 2 * radius) radius = height / 2
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + width, y, radius)
    ctx.closePath()
}

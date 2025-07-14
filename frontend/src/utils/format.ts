/**
 * 숫자를 한국어 단위(만/억)로 포맷합니다.
 * 예: 12345678 → '1234만', 250000000 → '2억'
 *
 * @param value - 포맷할 숫자
 * @param suffix - 뒤에 붙일 단위 텍스트 (예: '회', '명', '개' 등), 없으면 생략
 * @returns 포맷된 문자열 (예: '1.2만명', '3억회')
 */
export function formatKoreanNumber(value: number, suffix: string = ''): string {
    if (value >= 100_000_000) {
        return `${Math.floor(value / 100_000_000)}억${suffix}`
    }
    if (value >= 10_000) {
        return `${Math.floor(value / 10_000)}만${suffix}`
    }
    return `${value.toLocaleString()}${suffix}`
}

/**
 * 과거 날짜를 기준으로 상대적인 시간 문자열로 포맷합니다.
 * 예: 5분 전, 2시간 전, 3일 전 등
 *
 * @param date - 과거 시점의 날짜 (문자열, 숫자, 또는 Date 객체)
 * @returns 상대 시간 문자열 (예: '3일 전', '방금 전')
 */
export function formatRelativeTime(date: string | number | Date): string {
    const now = new Date()
    const past = new Date(date)
    const diff = now.getTime() - past.getTime()

    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (years > 0) return `${years}년 전`
    if (months > 0) return `${months}개월 전`
    if (days > 0) return `${days}일 전`
    if (hours > 0) return `${hours}시간 전`
    if (minutes > 0) return `${minutes}분 전`
    return '방금 전'
}

/**
 * 날짜를 한국어 표기 형식으로 포맷합니다.
 * 예: 2024년 5월 9일 오전 10:30
 *
 * @param date - 문자열 또는 Date 객체
 * @returns 한국어 형식의 날짜 문자열
 */

export function formatKoreanDate(date: string | Date): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date

    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(parsedDate)
}

/**
 * 숫자를 'xx' 형식의 문자열로 변환합니다.
 * 예: 0.65 → '65', 1 → '100', 2.4523 → '245.23'
 *
 * @param value - 퍼센트로 표시할 숫자 (예: 0.8 또는 245.23)
 * @param fractionDigits - 소수점 자리 수 (기본값: 0)
 * @returns 퍼센트 형식의 문자열 (예: '85', '99.50', '245.23')
 */
export const formatPercentString = (value: number, fractionDigits = 0): string => {
    if (isNaN(value)) return '0'
    return (value * 100).toFixed(fractionDigits)
}
/**
 * 숫자를 천 단위마다 ',' 표시를 넣어 포맷합니다.
 * 예: 1200 -> 1,200
 */
export const formatThousandComma = (value: number): string => {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 숫자가 1만 이상일 시 formatKoreanNumber로
 * 숫자가 1천 이상일 시 formatThousandComma로 포맷합니다.
 */
export const formatCompactNumber = (value: number): string => {
    if (value >= 10_000) return formatKoreanNumber(value)
    else if (value >= 1000) return formatThousandComma(value)
    else return value.toString()
}

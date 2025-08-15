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
 * 날짜를 'YY.MM.DD 오전/오후 h:mm' 형식의 문자열로 변환합니다.
 * @param {Date | string | number} dateInput - 변환할 Date 객체, 날짜 문자열, 또는 타임스탬프
 * @returns {string} 포맷팅된 날짜 문자열 (예: '25.06.29 오전 1:53')
 */
export const formatSimpleDate = (dateInput: Date | string | number) => {
    const date = new Date(dateInput)
    const KST_OFFSET_MS = 9 * 60 * 60 * 1000
    const kstTimestamp = date.getTime() + KST_OFFSET_MS
    const kstDate = new Date(kstTimestamp)

    const year = kstDate.getUTCFullYear().toString().slice(-2)
    const month = (kstDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = kstDate.getUTCDate().toString().padStart(2, '0')
    const minutes = kstDate.getUTCMinutes().toString().padStart(2, '0')

    let hours = kstDate.getUTCHours() // 0-23
    const ampm = hours >= 12 ? '오후' : '오전'

    hours %= 12
    if (hours === 0) {
        // 자정(0시)을 12시로 표시
        hours = 12
    }

    return `${year}.${month}.${day} ${ampm} ${hours}:${minutes}`
}

/**
 * 주어진 단어의 마지막 글자 받침 유무에 따라 올바른 조사를 선택해 **반환**합니다.
 * @param text 조사 앞에 오는 단어
 * @param particle 받침이 있을 때와 없을 때의 조사를 '/'로 구분한 문자열 (예: "을/를")
 * @returns 선택된 조사 문자열 (예: "을" 또는 "를")
 */
export const getJosa = (text: string, particle: string): string => {
    if (typeof text !== 'string' || text.length === 0 || typeof particle !== 'string' || particle.length === 0) {
        return ''
    }

    const [particleWithConsonant, particleWithoutConsonant] = particle.split('/')

    if (!particleWithConsonant || !particleWithoutConsonant) {
        return ''
    }

    const lastChar = text.charCodeAt(text.length - 1)

    if (lastChar < 0xac00 || lastChar > 0xd7a3) {
        return particleWithoutConsonant
    }

    const hasFinalConsonant = (lastChar - 0xac00) % 28 > 0

    return hasFinalConsonant ? particleWithConsonant : particleWithoutConsonant
}

export function formatViewCount(count: number): string {
    if (count >= 100_000_000) {
        return `${Math.floor(count / 100_000_000)}억회`
    }
    if (count >= 10_000) {
        return `${Math.floor(count / 10_000)}만회`
    }
    return `${count.toLocaleString()}회`
}

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

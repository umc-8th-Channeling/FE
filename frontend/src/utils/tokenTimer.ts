let logoutTimer: number | null = null

//토큰 만료 5초전에 콜백 함수 실행
export function scheduleLogoutFromToken(token: string, cb: () => void, aheadMs = 5_000) {
    try {
        const [, payloadB64] = token.split('.')
        const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))
        const expSec: number | undefined = payload?.exp
        if (!expSec) return

        const expireAt = expSec * 1000
        //남은 시간
        const msLeft = expireAt - Date.now() - aheadMs
        //중복 방지
        if (logoutTimer) window.clearTimeout(logoutTimer)
        if (msLeft > 0) {
            logoutTimer = window.setTimeout(cb, msLeft)
        } else {
            cb()
        }
    } catch (err) {
        console.warn('토큰 파싱 실패. 자동 로그아웃 예약 안 함:', err)
        cb() //강제 로그아웃
    }
}

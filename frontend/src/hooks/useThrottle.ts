import { useCallback, useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => any>(fn: T, delay = 500): T {
    const lastCall = useRef(0)

    return useCallback(
        ((...args: any[]) => {
            const now = Date.now()
            if (now - lastCall.current < delay) return //딜레이 내에서 다시 호출 시 무시
            lastCall.current = now
            fn(...args)
        }) as T,
        [fn, delay]
    )
}

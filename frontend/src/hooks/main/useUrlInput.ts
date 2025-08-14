import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { urlSchema, type UrlForm } from '../../lib/validation/urlSchema'
import { useAuthStore } from '../../stores/authStore'
import { useLoginStore } from '../../stores/LoginStore'
import usePostReportByUrl from '../report/usePostReportByUrl'

export const useUrlInput = (onRequestUrlSuccess?: (reportId: number, videoId: number) => void) => {
    const [isActive, setIsActive] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isAuth = useAuthStore((state) => state.isAuth)
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)

    const { mutate: requestNewReport } = usePostReportByUrl({
        onSuccess: ({ reportId, videoId }) => {
            onRequestUrlSuccess?.(reportId, videoId)
            setError(null)
        },
        onError: ({ code, message }) => {
            if (code === 'YOUTUBE400') {
                setError('유효한 유튜브 URL을 입력해주세요.')
            } else if (code === 'VIDEO403') {
                setError('본인 채널의 영상 URL을 입력해주세요.')
            } else {
                setError(message) // 그 외 다른 에러
            }
        },
    })

    const { register, handleSubmit, watch } = useForm<UrlForm>({
        defaultValues: { url: '' },
        resolver: zodResolver(urlSchema),
    })

    const url = watch('url')

    // URL이 변경될 때만 에러 상태를 초기화
    useEffect(() => {
        if (error) {
            setError(null)
        }
    }, [url]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const isValid = urlSchema.safeParse({ url }).success
        setIsActive(isValid && !error)
    }, [url, error])

    const onSubmit: SubmitHandler<UrlForm> = async ({ url }) => {
        if (!isAuth) {
            openLoginFlow() // 비로그인 상태에서 요청할 경우 로그인 플로우를 시작
            return
        }

        setError(null)
        requestNewReport({ url }) // 리포트 생성 요청
    }

    return { register, handleSubmit: handleSubmit(onSubmit), isActive, error }
}

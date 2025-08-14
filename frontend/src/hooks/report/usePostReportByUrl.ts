import { useMutation } from '@tanstack/react-query'
import { postReportByUrl } from '../../api/report'
import { useReportStore } from '../../stores/reportStore'
import type { ResponseReportByUrl, ResultReportByUrl } from '../../types/report/new'
import type { AxiosError } from 'axios'

interface ReportByUrlCallbacks {
    onSuccess: (data: ResultReportByUrl) => void
    onError: (errorData: { code: string; message: string }) => void
}

/**
 * usePostReportByUrl 훅은 유튜브 URL로 리포트를 생성하는 API를 호출하는 기능을 제공합니다.
 * 성공 시 리포트 ID를 반환하고, 실패 시 에러 메시지를 처리합니다.
 */
export default function usePostReportByUrl({ onSuccess, onError }: ReportByUrlCallbacks) {
    const startGenerating = useReportStore((state) => state.actions.startGenerating)
    const endGenerating = useReportStore((state) => state.actions.endGenerating)

    return useMutation({
        mutationFn: postReportByUrl,
        onSuccess: (data: ResponseReportByUrl) => {
            if (data.isSuccess && data.result) {
                startGenerating()
                onSuccess(data.result) // 성공 콜백 호출
            } else {
                endGenerating()
                onError({ code: data.code, message: data.message })
            }
        },
        onError: (error: AxiosError<ResponseReportByUrl>) => {
            endGenerating()
            if (error.response) {
                const errorData = error.response.data
                onError({ code: errorData.code, message: errorData.message })
            } else {
                onError({ code: 'NETWORK_ERROR', message: '네트워크 연결을 확인해주세요.' })
            }
        },
    })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReportIdeaBookmarkDto, ResponseReportIdeaBookmark } from '../../types/report/all'
import { patchReportIdeaBookmark } from '../../api/report'

export default function usePatchReportIdeaBookmark() {
    const queryClient = useQueryClient()

    return useMutation<ResponseReportIdeaBookmark, Error, ReportIdeaBookmarkDto>({
        mutationFn: patchReportIdeaBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reports', 'idea'] })
        },
        onError: (error) => {
            console.error('북마크 업데이트 실패:', error)
        },
    })
}

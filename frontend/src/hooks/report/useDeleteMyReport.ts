import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DeleteMyReport, ResponseDeleteMyReport } from '../../types/report/all'
import { deleteMyReport } from '../../api/report'

export const useDeleteMyReport = ({ channelId }: { channelId: number | undefined }) => {
    const queryClient = useQueryClient()

    return useMutation<ResponseDeleteMyReport, Error, DeleteMyReport>({
        mutationFn: deleteMyReport,
        onSuccess: () => {
            if (typeof channelId === 'number') {
                queryClient.invalidateQueries({ queryKey: ['my', 'report', channelId] })
                queryClient.invalidateQueries({ queryKey: ['recommendedVideos'] })
            }
        },
        onError: () => {
            alert('리포트 삭제 중 오류가 발생했습니다.')
        },
    })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DeleteMyReport, ResponseDeleteMyReport } from '../../types/report/all'
import { deleteMyReport } from '../../api/report'

export const useDeleteMyReport = ({ channelId }: { channelId: number }) => {
    const queryClient = useQueryClient()

    return useMutation<ResponseDeleteMyReport, Error, DeleteMyReport>({
        mutationFn: deleteMyReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my', 'report', channelId] })
        },
        onError: (error) => {
            console.error('리포트 삭제 중 오류가 발생했습니다.', error)
        },
    })
}

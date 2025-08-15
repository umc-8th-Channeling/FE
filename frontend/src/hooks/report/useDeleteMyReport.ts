import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DeleteMyReport, ResponseDeleteMyReport } from '../../types/report/all'
import { deleteMyReport } from '../../api/report'

export const useDeleteMyReport = ({ channelId }: { channelId: number }) => {
    const queryClient = useQueryClient()

    return useMutation<ResponseDeleteMyReport, Error, DeleteMyReport>({
        mutationFn: deleteMyReport,
        onSuccess: (data) => {
            console.log('리포트가 성공적으로 삭제되었습니다.', data)
            queryClient.invalidateQueries({ queryKey: ['my', 'report', channelId] })
        },
        onError: (error) => {
            console.error('리포트 삭제 중 오류가 발생했습니다.', error)
        },
    })
}

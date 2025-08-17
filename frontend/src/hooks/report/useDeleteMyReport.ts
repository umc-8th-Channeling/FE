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
            }
        },
        onError: () => {},
    })
}

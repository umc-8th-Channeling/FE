import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { postMyVideoReport } from '../../api/my'
import type { MyVideoReportDto, ResponseMyVideoReportDto } from '../../types/profile'
import type { AxiosError } from 'axios'

export default function usePostVideoReport(
    options?: UseMutationOptions<ResponseMyVideoReportDto, AxiosError, MyVideoReportDto>
) {
    return useMutation<ResponseMyVideoReportDto, AxiosError, MyVideoReportDto>({
        mutationFn: (videoId: MyVideoReportDto) => postMyVideoReport(videoId),
        ...options,
    })
}

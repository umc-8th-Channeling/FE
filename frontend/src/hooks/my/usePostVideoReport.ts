import { useMutation } from '@tanstack/react-query'
import { postVideoReport } from '../../api/my'
import { ResponseVideoReportDto } from '../../types/channel'

export default function usePostVideoReport() {
    return useMutation<ResponseVideoReportDto, Error, number>({
        mutationFn: (videoId: number) => postVideoReport(videoId),
    })
}

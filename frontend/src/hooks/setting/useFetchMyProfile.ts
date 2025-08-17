import { useQuery } from '@tanstack/react-query'
import type { User } from '../../types/channel'
import { fetchMyProfile as fetchMyProfileAPI } from '../../api/user'

export const useFetchMyProfile = (enabled = true) => {
    return useQuery<User, Error, User, [string]>({
        queryKey: ['my-profile'],
        // import한 API 함수 사용
        queryFn: async () => {
            const data = await fetchMyProfileAPI()
            return data.result
        },
        staleTime: Infinity,
        retry: false,
        enabled,
    })
}

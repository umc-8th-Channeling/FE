import { useQuery } from '@tanstack/react-query'
import type { User } from '../../types/channel'
import { fetchMyProfile as fetchMyProfileAPI } from '../../api/user'

export function useFetchMyProfile<T = User>(options?: { enabled?: boolean; select?: (data: User | undefined) => T }) {
    return useQuery<User, Error, T, ['my-profile']>({
        queryKey: ['my-profile'],
        // import한 API 함수 사용
        queryFn: async () => {
            const data = await fetchMyProfileAPI()
            return data.result
        },
        staleTime: Infinity,
        retry: false,
        enabled: options?.enabled ?? true,
        select: options?.select,
    })
}

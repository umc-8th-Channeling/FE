import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../../api/axios'
import type { ResponseMyProfile } from '../../types/channel'

export const fetchMyProfile = async (): Promise<ResponseMyProfile> => {
    const { data } = await axiosInstance.get('/members')
    return data.result
}

export const useFetchMyProfile = () => {
    return useQuery({
        queryKey: ['my-profile'],
        queryFn: fetchMyProfile,
        staleTime: Infinity,
    })
}

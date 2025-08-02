import type {
    RequestChannelDto,
    ResponseChannelDto,
    RequestChannelVideoDto,
    ResponseChannelVideoDto,
} from '../types/profile'
import { axiosInstance } from './axios'

export const getChannelDetail = async ({ channelId }: RequestChannelDto): Promise<ResponseChannelDto> => {
    // 1. localStorage에서 정보 꺼내기
    const userJson = localStorage.getItem('loginMember')
    console.log('userJson 실제 값:', userJson)
    const token = localStorage.getItem('accessToken')

    // 2. 예외 처리
    if (!userJson || !token) {
        console.warn('로그인 정보가 없습니다.')
        throw new Error('로그인 필요')
    }

    // 3. JSON 파싱
    const loginMember = userJson ? JSON.parse(userJson) : null
    console.log('loginMember 값:', loginMember)

    // 4. 쿼리 파라미터 구성
    const params = {
        loginMember: JSON.stringify(loginMember), // 서버 요구대로 문자열화
    }

    // 5. axios 요청
    const { data } = await axiosInstance.get(`/channels/${channelId}`, {
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    console.log('📦 채널 상세 응답:', data)

    return data
}

export const getChannelVideo = async ({
    channelId,
    type,
}: RequestChannelVideoDto): Promise<ResponseChannelVideoDto> => {
    const token = localStorage.getItem('accessToken')
    const { data } = await axiosInstance.get(`/channels/${channelId}/videos`, {
        params: {
            type: type,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    console.log('📦 채널 비디오 상세 응답:', data)
    return data
}

import type { RequestChannelDto, ResponseChannelDto } from '../types/profile'
import { axiosInstance } from './axios'

export const getChannelDetail = async ({ channelId }: RequestChannelDto): Promise<ResponseChannelDto> => {
    // 1. localStorage에서 정보 꺼내기
    const userJson = localStorage.getItem('loginMember')
    const token = localStorage.getItem('accessToken')

    // 2. 예외 처리
    if (!userJson || !token) {
        console.warn('로그인 정보가 없습니다.')
        throw new Error('로그인 필요')
    }

    // 3. JSON 파싱
    const loginMember = JSON.parse(userJson)

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

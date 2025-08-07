import type { ResponseBookmarkedIdeas } from '../types/idea'
import { axiosInstance } from './axios'

export const getBookmarkedIdeas = async (page: number, size: number): Promise<ResponseBookmarkedIdeas> => {
    const res = await axiosInstance.get('/ideas/bookmarks', {
        params: { page, size },
    })
    return res.data
}

export const toggleBookmarkIdea = async (ideaId: number) => {
    const response = await axiosInstance.patch(`/ideas/bookmarks/${ideaId}`)
    return response.data
}

import type {
    BookmarkedIdeasDto,
    PatchIdeaBookmarkDto,
    ResponseBookmarkedIdeas,
    ResponsePatchIdeaBookmark,
} from '../types/idea'
import { axiosInstance } from './axios'

// 아이디어 북마크 조회
export const getBookmarkedIdeas = async ({ page, size }: BookmarkedIdeasDto): Promise<ResponseBookmarkedIdeas> => {
    const res = await axiosInstance.get('/ideas/bookmarks', {
        params: { page, size },
    })
    return res.data
}

// 아이디어 북마크 추가/제거
export const patchReportIdeaBookmark = async ({ ideaId }: PatchIdeaBookmarkDto): Promise<ResponsePatchIdeaBookmark> => {
    const { data } = await axiosInstance.patch(`ideas/${ideaId}/bookmarks`)
    return data
}

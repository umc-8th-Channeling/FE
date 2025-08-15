import type { CommonResponse } from './common'

export type Idea = {
    ideaId: number
    title: string
    content: string
    hashTag: string
    isBookMarked: boolean
}

export type BookmarkedIdeas = {
    total: number
    page: number
    size: number
    hasNextPage: boolean
    bookmarkedIdeaList: Idea[]
}

// ✅ 아이디어 북마크 조회 요청 타입
export type BookmarkedIdeasDto = {
    page: number
    size: number
}

// 아이디어 북마크 조회 응답 타입
export type ResponseBookmarkedIdeas = CommonResponse<BookmarkedIdeas>

// ✅ 아이디어 북마크 추가/제거 요청 타입
export type PatchIdeaBookmarkDto = {
    ideaId: number
}

// 아이디어 북마크 추가/제거 응답 타입
export type ResponsePatchIdeaBookmark = CommonResponse<{
    ideaId: number
    isBookMarked: boolean
}>

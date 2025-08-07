export interface BookmarkedIdea {
    ideaId: number
    title: string
    content: string
    hashTag: string
    isBookmarked: boolean
}

export interface ResponseBookmarkedIdeas {
    isSuccess: boolean
    code: string
    message: string
    result: {
        total: number
        page: number
        size: number
        hasNextPage: boolean
        bookmarkedIdeaList: BookmarkedIdea[]
    }
}

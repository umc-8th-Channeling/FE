// src/hooks/idea/useBookmarkedIdeas.ts
import { useQuery } from '@tanstack/react-query'
import { getBookmarkedIdeas } from '../../../api/idea'

export function useBookmarkedIdeas(page: number, size: number) {
    return useQuery({
        queryKey: ['bookmarkedIdeas', page],
        queryFn: () => getBookmarkedIdeas(page, size),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Idea, ReportIdeaBookmarkDto, ResponseReportIdeaBookmark } from '../../types/report/all'
import { patchReportIdeaBookmark } from '../../api/report'

interface OptimisticUpdateContext {
    previousIdeasResponse?: { ideas: Idea[] }
}

export default function usePatchReportIdeaBookmark() {
    const queryClient = useQueryClient()

    const queryKey = ['reports', 'idea']

    return useMutation<ResponseReportIdeaBookmark, Error, ReportIdeaBookmarkDto, OptimisticUpdateContext>({
        mutationFn: patchReportIdeaBookmark,
        // 낙관적 업데이트 설정
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey })

            const previousIdeasResponse = queryClient.getQueryData<{ ideas: Idea[] }>(queryKey)

            if (previousIdeasResponse) {
                queryClient.setQueryData(queryKey, {
                    ...previousIdeasResponse,
                    ideas: previousIdeasResponse.ideas.map((idea) =>
                        idea.ideaId === variables.ideaId
                            ? { ...idea, isBookMarked: !idea.isBookMarked } // 북마크 상태를 미리 변경
                            : idea
                    ),
                })
            }

            return { previousIdeasResponse }
        },
        onError: (err, _variables, context) => {
            console.error('북마크 업데이트 실패 (롤백 실행):', err)
            // UI 원상 복구
            if (context?.previousIdeasResponse) {
                queryClient.setQueryData(queryKey, context.previousIdeasResponse)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey })
        },
    })
}

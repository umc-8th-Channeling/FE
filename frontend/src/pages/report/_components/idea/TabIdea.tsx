import { TrendKeywords } from './TrendKeywords'
import { ContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'

export const TabIdea = () => {
    const isLoading = false // ✅ 임시

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords />
            <ContentsIdea />
        </div>
    )
}

import { TrendKeywords } from './TrendKeywords'
import { NextContentsIdea } from './ContentsIdea'
import { Skeleton } from './Skeleton'

export const TabIdea = () => {
    const isLoading = false // ✅ 임시

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <TrendKeywords />
            <NextContentsIdea />
        </div>
    )
}

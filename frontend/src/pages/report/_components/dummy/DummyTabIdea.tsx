import { ContentsIdea } from '../idea/ContentsIdea'
import { TrendKeywords } from '../idea/TrendKeywords'

export const DummyTabIdea = () => {
    return (
        <div className="space-y-16">
            <TrendKeywords />
            <ContentsIdea />
        </div>
    )
}

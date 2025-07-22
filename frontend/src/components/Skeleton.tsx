import type { PropsWithChildren } from 'react'

/**
 * 애니메이션이 적용된 기본 스켈레톤 박스 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.sizeConfig - TailwindCSS 클래스 문자열로, 박스의 너비와 높이 등의 크기를 지정
 *
 * @returns {JSX.Element} 크기와 애니메이션이 적용된 스켈레톤 박스
 */
export const BaseSkeleton = ({ sizeConfig }: { sizeConfig: string }) => {
    return (
        <div
            className={`
                ${sizeConfig} rounded-lg bg-[length:200%_100%]
                bg-gradient-to-r from-neutral-white-opacity5 via-neutral-white-opacity10 to-neutral-white-opacity5 motion-safe:animate-[var(--animate-wave)]
            `}
        />
    )
}

/**
 * 타이틀과 내용을 포함하는 스켈레톤 블록 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} [props.titleSizeConfig='w-[72px] h-[28px]'] - 타이틀 스켈레톤 크기 지정, 기본값 있음
 * @param {React.ReactNode} props.children - 타이틀 아래에 표시할 내용(스켈레톤 등)
 *
 * @returns {JSX.Element} 타이틀과 내용이 적절히 배치된 스켈레톤 영역
 */
export const TitledSkeleton = ({
    titleSizeConfig = 'w-[72px] h-[28px]',
    children,
}: PropsWithChildren<{ titleSizeConfig?: string }>) => {
    return (
        <div className="flex flex-col gap-4">
            <BaseSkeleton sizeConfig={titleSizeConfig} />
            <div className="flex-1 w-full">{children}</div>
        </div>
    )
}

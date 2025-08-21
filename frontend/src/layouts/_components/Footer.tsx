export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full desktop:left-18 desktop:w-[calc(100%-72px)] desktop:border-8 desktop:border-t-0 desktop:border-surface desktop:rounded-lg">
            <footer
                className="flex justify-center items-center py-8 desktop:rounded-lg font-footer-fixed"
                style={{
                    background: 'linear-gradient(180deg, rgba(45, 7, 9, 0.20) 0%, var(--primary-50, #2D0709) 50%)',
                }}
            >
                <div className="grid grid-cols-2 tablet:grid-cols-4 gap-y-4 gap-x-[56px] tablet:gap-x-[69px] text-center">
                    <a
                        href="https://spangled-bridge-914.notion.site/1f7086918f4380e8a744d961e8efaa9c?source=copy_link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        서비스 이용약관
                    </a>
                    <a
                        href="https://spangled-bridge-914.notion.site/1f7086918f4380d88829f055b0f0732a?source=copy_link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        개인정보 처리방침
                    </a>
                    <a href="https://open.kakao.com/o/sTPlNEvh" target="_blank" rel="noopener noreferrer">
                        문의하기
                    </a>
                    <a href="https://m.site.naver.com/1O9pR" target="_blank" rel="noopener noreferrer">
                        Contact Us
                    </a>
                </div>
            </footer>
        </div>
    )
}

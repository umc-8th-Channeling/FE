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
                        href="https://www.notion.so/1f7086918f4380e8a744d961e8efaa9c"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        서비스 이용약관
                    </a>
                    <a
                        href="https://www.notion.so/1f7086918f4380d88829f055b0f0732a"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        개인정보 처리방침
                    </a>
                    <div>문의하기</div>
                    <div>Contact Us</div>
                </div>
            </footer>
        </div>
    )
}

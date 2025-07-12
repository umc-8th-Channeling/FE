export const Footer = () => {
    return (
        <div className="fixed bottom-0 left-18 w-[calc(100%-72px)] border-8 border-t-0 border-surface rounded-lg">
            <footer
                className="flex justify-center items-center py-8 px-2 rounded-lg font-footer-fixed"
                style={{
                    background: 'linear-gradient(180deg, rgba(45, 7, 9, 0.20) 0%, var(--primary-50, #2D0709) 50%)',
                }}
            >
                <div className="grid grid-cols-2 tablet:grid-cols-4 gap-y-2 gap-x-[56px] tablet:gap-x-[69px] text-center">
                    <div>서비스 이용약관</div>
                    <div>개인정보 처리방침</div>
                    <div>문의하기</div>
                    <div>Contact Us</div>
                </div>
            </footer>
        </div>
    )
}

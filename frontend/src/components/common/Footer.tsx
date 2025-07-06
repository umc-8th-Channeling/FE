export const Footer = (): React.ReactElement => {
    return (
        <footer
            className="
        fixed bottom-7 left-20 w-[calc(100%-80px)] z-10
        flex flex-wrap justify-center items-end content-end
        h-21 py-8 px-2
        gap-x-[69px] gap-y-0
        font-footer-fixed
      "
            style={{
                letterSpacing: '-0.35px',
            }}
        >
            <div>서비스 이용약관</div>
            <div>개인정보 처리방침</div>
            <div>문의하기</div>
            <div>Contact Us</div>
        </footer>
    )
}

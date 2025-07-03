export const Footer = () : React.ReactElement => {
    return (
        <footer
            className="fixed bottom-7 left-0 w-full text-center text-sm text-white py-4 z-10 sm:pl-18"
            style={{
                fontFamily: "Pretendard, sans-serif",
                letterSpacing: "-0.025em"
            }}
            >
              <div className="flex flex-wrap justify-center
              gap-x-2 gap-y-1
              sm:gap-x-10
              md:gap-x-12
              lg:gap-x-18">
              <a href="#" className="hover:text-gray-600 font-caption">서비스 이용약관</a>
              <a href="#" className="hover:text-gray-600 font-caption">개인정보 처리방침</a>
              <a href="#" className="hover:text-gray-600 font-caption">문의하기</a>
              <a href="#" className="hover:text-gray-600 font-caption">Contact Us</a>
            </div>
        </footer>
    );
};
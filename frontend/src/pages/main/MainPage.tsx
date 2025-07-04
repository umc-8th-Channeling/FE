import { UrlInputForm } from './_components/UrlInputForm';

export default function MainPage() {
    return (
        <div className="min-h-screen h-full flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-primary-50">
            <div className="flex flex-col items-center justify-center space-y-4 tablet:space-y-6 whitespace-pre-line tablet:whitespace-nowrap">
                <h1
                    className="
                    text-center text-[18px] leading-[150%] font-bold tracking-[-0.45px] tablet:text-[20px] tablet:leading-[140%] tablet:tracking-[-0.5px]
                    whitespace-pre-line tablet:whitespace-nowrap
                "
                >
                    영상 퍼포먼스 분석과{'\n'} 콘텐츠 아이디어를 추천받으세요
                </h1>

                {/* Url Form */}
                <UrlInputForm />
            </div>
        </div>
    );
}

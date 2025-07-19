import { Footer } from '../../components/common/Footer'
import { useAuthStore } from '../../stores/authStore'
import { UrlInputForm, VideoRecommendation } from './_components'
import { DUMMY_MY, DUMMY_POPULAR } from './dummy'

export default function MainPage() {
    const isAuth = useAuthStore((state) => state.isAuth)

    return (
        <div className="flex flex-col items-center justify-center z-50">
            <div
                className="
                    flex flex-col items-center justify-center 
                    mt-[100px] tablet:mt-60 desktop:mt-80 mb-[222px] tablet:mb-[324px] desktop:mb-[84px]
                    space-y-4 tablet:space-y-6 whitespace-pre-line tablet:whitespace-
                "
            >
                <h1
                    className="
                        text-center text-[18px] leading-[150%] font-bold tracking-[-0.45px] tablet:text-[20px] tablet:leading-[140%] tablet:tracking-[-0.5px]
                        whitespace-pre-line tablet:whitespace-nowrap
                    "
                >
                    영상 퍼포먼스 분석과{'\n'} 콘텐츠 아이디어를 추천받으세요
                </h1>

                <UrlInputForm />

                <div className="space-y-20 tablet:space-y-10">
                    {isAuth && <VideoRecommendation label="내 영상의 개선점을 알고 싶다면" videos={DUMMY_MY} />}
                    <VideoRecommendation label="인기있는 영상의 비결은?" videos={DUMMY_POPULAR} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

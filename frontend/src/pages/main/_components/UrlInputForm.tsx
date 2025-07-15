import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import ArrowButton from '../../../components/ArrowButton'
import { ErrorToast } from './ErrorToast'
import ErrorIcon from '../../../assets/icons/error.svg?react'
import Spinner from '../../../assets/loading/spinner.svg?react'
import { useUrlInput } from '../../../hooks/main/useUrlInput'

export const UrlInputForm = () => {
    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, isActive, error, setError } = useUrlInput((url) => {
        console.log('메인 페이지에서 받은 URL:', url)

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            navigate('/report')
        }, 5000)
    })

    return (
        <>
            {/* 확인 용 임시 버튼 */}
            <button
                onClick={() => {
                    if (error) setError(null)
                    else if (!error) setError('유효하지 않은 링크입니다.')
                }}
                className="absolute top-4 right-4 cursor-pointer px-6 py-3 rounded-full bg-primary-400"
            >
                에러 확인 용 버튼
            </button>
            {/* 확인 용 임시 버튼 끝 */}

            <div className="mb-[100px] tablet:mb-20 desktop:mb-[100px]">
                <form
                    onSubmit={handleSubmit}
                    className={clsx(
                        'flex flex-row items-center justify-center w-[328px] tablet:w-[588px] p-2 tablet:px-4 tablet:py-3',
                        'bg-neutral-white-opacity10 border rounded-full transition-colors duration-300',
                        {
                            'border-2 border-error': error,
                            'border-gray-400': !error && isFocused,
                            'border-transparent': !error && !isFocused,
                        }
                    )}
                >
                    {error && <ErrorIcon className="ml-2" />}
                    <input
                        {...register('url')}
                        id="youtube url input"
                        type="url"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="유튜브 영상 URL을 입력하세요."
                        className="
                            flex-1 outline-none px-2 placeholder-gray-600 focus:placeholder-transparent
                            text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]
                        "
                    />
                    <ArrowButton type="submit" isActive={isActive} className="size-6 tablet:size-8" />
                </form>

                <p
                    className={`
                        mt-2 ml-6 tablet:ml-10 text-error text-[14px] leading-[140%] tracking-[-0.35px]
                        transition-all duration-300 ease-in-out ${error ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}
                    `}
                >
                    {error}
                </p>
            </div>

            {/* 입력 에러 토스트 */}
            {error && <ErrorToast errorMessage={error} />}

            {/* URL 제출 후 로딩 스피너 */}
            {isLoading && (
                <div className="fixed inset-0 h-screen z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-neutral-black-opacity50 backdrop-blur-sm" />

                    <div className="desktop:ml-20 relative flex flex-col justify-center items-center text-center gap-6">
                        <Spinner className="animate-spin" />
                        <div className="space-y-2">
                            <h3 className="text-[20px] font-bold leading-[140%] tracking-[-0.5px]">영상 분석 중...</h3>
                            <p className="text-[16px] leading-[150%] tracking-[-0.4px]">
                                조금만 기다려 주세요. 곧 결과가 나와요!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

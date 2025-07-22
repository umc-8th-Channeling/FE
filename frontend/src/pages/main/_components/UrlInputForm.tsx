import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useReportStore } from '../../../stores/reportStore'

import ArrowButton from '../../../components/ArrowButton'
import { ErrorToast } from './ErrorToast'
import ErrorIcon from '../../../assets/icons/error.svg?react'
import { useUrlInput } from '../../../hooks/main/useUrlInput'
import Modal from '../../../components/Modal'
import { useAuthStore } from '../../../stores/authStore'

export const UrlInputForm = () => {
    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false)

    const startGenerating = useReportStore((state) => state.actions.startGenerating)
    const endGenerating = useReportStore((state) => state.actions.endGenerating)

    const isAuth = useAuthStore((state) => state.isAuth)

    // ✅ 임시 로그인 모달 열림 상태
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)
    const [isOpen, setIsOpen] = useState(false)

    const { register, handleSubmit, isActive, error, setError } = useUrlInput((url) => {
        console.log('메인 페이지에서 받은 URL:', url)

        if (isAuth) {
            startGenerating()
            setTimeout(() => {
                endGenerating()
                navigate('/report/1') // ✅ 임시 네비게이션: API 연결시 응답 영상 id로 수정 필요
            }, 5000)
        } else {
            // ✅ 임시 비로그인 로직
            setIsOpen(true)
        }
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

            <div className="relative mb-[100px] tablet:mb-20 desktop:mb-[100px]">
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
                    <ErrorIcon
                        className={`ml-2 transition-opacity duration-300 ${
                            error ? 'opacity-100 max-w-6' : 'opacity-0 max-w-0'
                        }`}
                    />
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
                        absolute mt-2 ml-6 text-error text-[14px] leading-[140%] tracking-[-0.35px]
                        transition-all duration-300 ease-in-out ${error ? 'opacity-100 max-h-5' : 'opacity-0 max-h-0'}
                    `}
                >
                    {error}
                </p>
            </div>

            {/* 입력 에러 토스트 */}
            {error && <ErrorToast errorMessage={error} />}

            {/* ✅ 임시 로그인 모달 */}
            {isOpen && (
                <Modal
                    title="임시 로그인 모달"
                    onClose={() => {
                        setAuthMember()
                        setIsOpen(false)
                    }}
                />
            )}
        </>
    )
}

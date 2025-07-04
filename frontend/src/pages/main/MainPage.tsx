import { useEffect, useState } from 'react';
import ArrowButton from '../../components/ArrowButton';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorIcon from '../../assets/icons/error.svg?react';
import clsx from 'clsx';
import { InputErrorToast } from './_components/InputErrorToast';

const urlSchema = z.object({
    url: z.string().refine((value) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$',
            'i' // fragment locator
        );
        return urlPattern.test(value);
    }, 'Invalid URL'),
});

type UrlForm = z.infer<typeof urlSchema>;

export default function MainPage() {
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, watch } = useForm<UrlForm>({
        defaultValues: {
            url: '',
        },
        resolver: zodResolver(urlSchema),
    });

    const urlValue = watch('url');

    // API 연결 시 수정이 필요한 부분
    useEffect(() => {
        const isValid = urlSchema.safeParse({ url: urlValue }).success;
        setIsActive(isValid && !error);
    }, [urlValue, error]);

    const onSubmit: SubmitHandler<UrlForm> = async ({ url }) => {
        try {
            console.log('MainPage: ', url);
        } catch {
            setError('유효하지 않은 링크입니다.'); // 임시 에러 메시지 API 연결 시 수정 필요
        }
    };

    return (
        <div className="min-h-screen h-full flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-primary-50">
            <div className="flex flex-col items-center justify-center space-y-4 tablet:space-y-6 whitespace-pre-line tablet:whitespace-nowrap">
                {/* 확인 용 임시 버튼 */}
                <button
                    onClick={() => {
                        if (error) setError(null);
                        else if (!error) setError('유효하지 않은 링크입니다.');
                    }}
                    className="absolute top-4 right-4 cursor-pointer px-6 py-3 rounded-full bg-primary-400"
                >
                    에러 확인 용 버튼
                </button>
                {/* 확인 용 임시 버튼 끝 */}

                <h1
                    className="
                    text-center text-[18px] leading-[150%] font-bold tracking-[-0.45px] tablet:text-[20px] tablet:leading-[140%] tablet:tracking-[-0.5px]
                    whitespace-pre-line tablet:whitespace-nowrap
                "
                >
                    영상 퍼포먼스 분석과{'\n'} 콘텐츠 아이디어를 추천받으세요
                </h1>

                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
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
                                flex-1 px-2 placeholder-gray-600 outline-none focus:placeholder-transparent
                                text-[14px] leading-[150%] font-normal tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]    
                            "
                        />
                        <ArrowButton type="submit" isActive={isActive} className="w-6 h-6 tablet:w-8 tablet:h-8" />
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
                {error && <InputErrorToast errorMessage={error} />}
            </div>
        </div>
    );
}

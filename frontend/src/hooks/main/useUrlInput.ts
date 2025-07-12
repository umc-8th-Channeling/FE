import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { urlSchema, type UrlForm } from '../../lib/validation/urlSchema'
import { useNavigate } from 'react-router-dom'

export const useUrlInput = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, watch } = useForm<UrlForm>({
        defaultValues: { url: '' },
        resolver: zodResolver(urlSchema),
    })

    const url = watch('url')

    useEffect(() => {
        const isValid = urlSchema.safeParse({ url }).success
        setIsActive(isValid && !error)
    }, [url, error])

    const onSubmit: SubmitHandler<UrlForm> = async ({ url }) => {
        try {
            console.log('Youtube URL Input: ', url)
            navigate('/report')
        } catch {
            setError('유효하지 않은 링크입니다.') // 임시 에러 메시지 API 연결 시 수정 필요
        }
    }

    return { register, handleSubmit: handleSubmit(onSubmit), isActive, error, setError }
}

import { useQueryClient } from '@tanstack/react-query'
import { useUpdateMemberAgree } from '../../../hooks/setting/userMutations'
import ConsentTab from '../_components/ConsentTab'
import { useFetchMyProfile } from '../../../hooks/setting/useFetchMyProfile'
import { useCallback } from 'react'
import type { User } from '../../../types/channel'

export default function ConsentSettings() {
    const qc = useQueryClient()

    const { data: consent } = useFetchMyProfile({
        select: (u) => ({
            marketingEmailAgree: u?.marketingEmailAgree ?? false,
            dayContentEmailAgree: u?.dayContentEmailAgree ?? false,
        }),
    })

    const { mutate: updateAgree } = useUpdateMemberAgree()

    const handleChange = useCallback(
        (key: 'marketingEmailAgree' | 'dayContentEmailAgree', value: boolean) => {
            const prev = qc.getQueryData<User>(['my-profile'])

            qc.setQueryData<User>(['my-profile'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    marketingEmailAgree: key === 'marketingEmailAgree' ? value : old.marketingEmailAgree ?? false,
                    dayContentEmailAgree: key === 'dayContentEmailAgree' ? value : old.dayContentEmailAgree ?? false,
                }
            })

            updateAgree(
                {
                    marketingEmailAgree: key === 'marketingEmailAgree' ? value : consent?.marketingEmailAgree ?? false,
                    dayContentEmailAgree:
                        key === 'dayContentEmailAgree' ? value : consent?.dayContentEmailAgree ?? false,
                },
                {
                    onError: () => {
                        qc.setQueryData(['my-profile'], prev)
                        alert('존재하지 않는 회원 동의입니다.')
                    },
                    onSuccess: (data) => {
                        qc.setQueryData<User>(['my-profile'], (old) =>
                            old
                                ? {
                                      ...old,
                                      marketingEmailAgree: data.result.marketingEmailAgree,
                                      dayContentEmailAgree: data.result.dayContentEmailAgree,
                                  }
                                : old
                        )
                    },
                }
            )
        },
        [consent, qc, updateAgree]
    )

    return (
        <ConsentTab
            marketingEmail={consent?.marketingEmailAgree ?? false}
            dailyContentEmail={consent?.dayContentEmailAgree ?? false}
            onMarketingChange={(value) => handleChange('marketingEmailAgree', value)}
            onDailyContentChange={(value) => handleChange('dayContentEmailAgree', value)}
        />
    )
}

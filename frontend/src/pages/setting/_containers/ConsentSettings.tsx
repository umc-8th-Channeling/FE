import { useUpdateMemberAgree } from '../../../hooks/setting/userMutations'
import { useAuthStore } from '../../../stores/authStore'
import ConsentTab from '../_components/ConsentTab'

export default function ConsentSettings() {
    const { user } = useAuthStore()
    const { setUser } = useAuthStore((state) => state.actions)
    const { mutate: updateAgree } = useUpdateMemberAgree()

    const handleAgreeChange = (key: 'marketingEmailAgree' | 'dayContentEmailAgree', value: boolean) => {
        const payload = {
            marketingEmailAgree: key === 'marketingEmailAgree' ? value : user?.marketingEmailAgree ?? false,
            dayContentEmailAgree: key === 'dayContentEmailAgree' ? value : user?.dayContentEmailAgree ?? false,
        }

        updateAgree(payload, {
            onSuccess: (data) => {
                if (!user) return
                setUser({
                    ...user,
                    marketingEmailAgree: data.result.marketingEmailAgree,
                    dayContentEmailAgree: data.result.dayContentEmailAgree,
                })
            },
            onError: () => alert('존재하지 않는 회원 동의입니다.'),
        })
    }

    return (
        <ConsentTab
            marketingEmail={user?.marketingEmailAgree ?? false}
            dailyContentEmail={user?.dayContentEmailAgree ?? false}
            onMarketingChange={(value) => handleAgreeChange('marketingEmailAgree', value)}
            onDailyContentChange={(value) => handleAgreeChange('dayContentEmailAgree', value)}
        />
    )
}

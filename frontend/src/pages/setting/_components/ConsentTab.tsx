import { Label } from './SettingLabel'
import CustomToggle from '../../../components/CustomToggle'

type Props = {
    marketingEmail: boolean
    dailyContentEmail: boolean
    onMarketingChange: (v: boolean) => void
    onDailyContentChange: (v: boolean) => void
}

export default function ConsentTab({
    marketingEmail,
    dailyContentEmail,
    onMarketingChange,
    onDailyContentChange,
}: Props) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
                <Label className="font-caption-14m text-gray-600">이메일 알림</Label>

                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="font-body-16b">마케팅 이메일 수신 동의</span>
                        <span className="font-caption-14r text-gray-600">
                            이벤트 또는 혜택과 관련된 마케팅 이메일 수신을 받아요.
                        </span>
                    </div>
                    <CustomToggle id="marketing-toggle" checked={marketingEmail} onChange={onMarketingChange} />
                </div>

                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="font-body-16b">일일 콘텐츠 추천 이메일 수신</span>
                        <span className="font-caption-14r text-gray-600">
                            프리미엄 요금제에서 제공되는 일일 콘텐츠를 추천받아요.
                        </span>
                    </div>
                    <CustomToggle
                        id="daily-content-toggle"
                        checked={dailyContentEmail}
                        onChange={onDailyContentChange}
                    />
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'

type TabItem = { label: string; component: React.JSX.Element }

interface TabsProps {
    tabs: TabItem[]
    activeTab?: string // 외부에서 선택된 탭 제어
    onChangeTab?: (label: string) => void // 탭 변경 이벤트 콜백 함수
    textStyle?: string // 텍스트 스타일
    bgColor?: string // 탭 배경 색상
    spaceY?: string // tab과 아래 컴포넌트 사이의 간격 (y)
}

const Tabs = ({
    tabs,
    activeTab: controlledActiveTab,
    onChangeTab,
    textStyle = 'text-[18px] leading-[140%] tracking-[-0.45px]',
    bgColor = 'bg-surface-elevate-l1',
    spaceY = 'space-y-10',
}: TabsProps) => {
    const [internalActiveTab, setInternalActiveTab] = useState(tabs[0].label)
    const isControlled = controlledActiveTab !== undefined
    const activeTab = isControlled ? controlledActiveTab : internalActiveTab

    const handleTabClick = (label: string) => {
        if (isControlled && onChangeTab) onChangeTab(label)
        else setInternalActiveTab(label)
    }

    return (
        <div className={`flex flex-col w-full ${spaceY}`}>
            <div className={`flex flex-row justify-between p-1 gap-2 rounded-lg ${bgColor}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => handleTabClick(tab.label)}
                        className={`cursor-pointer w-full py-2 rounded-sm transition-colors duration-300 ${textStyle}
                            ${activeTab === tab.label ? 'bg-gray-50 font-bold' : 'bg-transparent font-medium'}
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>{tabs.find((tab) => tab.label === activeTab)?.component}</div>
        </div>
    )
}

export default Tabs

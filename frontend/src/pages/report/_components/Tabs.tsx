import { useState } from 'react'
import { TabOverview } from './overview'
import { TabAnalysis } from './analysis'
import { TabIdea } from './idea'

const TABS = [
    { label: '개요', component: <TabOverview /> },
    { label: '분석', component: <TabAnalysis /> },
    { label: '아이디어', component: <TabIdea /> },
] as const

type TabLabel = (typeof TABS)[number]['label']

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState<TabLabel>(TABS[0].label)

    const handleTabClick = (label: TabLabel) => setActiveTab(label)

    return (
        <>
            <div className="flex flex-row justify-between p-1 gap-2 bg-surface-elevate-l1 rounded-lg">
                {TABS.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => handleTabClick(tab.label)}
                        className={`cursor-pointer w-full py-2 rounded-sm transition-colors duration-300 ${
                            activeTab === tab.label ? 'bg-gray-50 ' : 'bg-transparent'
                        }`}
                    >
                        <span className="text-[18px] font-bold leading-[140%] tracking-[-0.45px]">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div>{TABS.find((tab) => tab.label === activeTab)?.component}</div>
        </>
    )
}

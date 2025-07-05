import { useState } from 'react';
import RecentReportCard from './_components/RecentReportCard';
import ScrapCard from './_components/ScrapCard';
import type { LibraryItem, ScrapItem } from '../../types/library';

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'report' | 'scrap'>('report');
    const [subTab, setSubTab] = useState<'video' | 'shorts'>('video');

    // 리포트 mock
    const reportData: LibraryItem[] = [
        {
            id: 1,
            title: '영상 제목 1',
            thumbnail: '/thumbnail1.png',
            channel: '채널 이름',
            updatedAt: '25.06.29 오전 00시',
            views: 200,

            daysAgo: 3,
        },

        {
            id: 2,
            title: '영상 제목 2',
            thumbnail: '/thumbnail2.png',
            channel: '채널 이름',
            updatedAt: '25.06.30 오전 00시',
            views: 200,
            daysAgo: 4,
        },
    ];

    // 스크랩 mock
    const scrapData: ScrapItem[] = [
        {
            title: '코케트(coquette) 패션 인사',
            description: '코케트 룩으로 변신 후...',
            hashtags: ['코케트', '패션', '카키소놀'],
        },
        {
            title: '황금연휴 축제 현장 인사 투어',
            description: '황금연휴 기간 동안 인기 축제에서...',
            hashtags: ['황금연휴', '축제', '카키소놀'],
        },
        {
            title: '아보하(아주 보통의 하루) 거리 인사',
            description: '“오늘도 별일 없이 안녕하세요”~ 지나가는 사람들에게 먼저 인사하며 소소한 대화 포함',
            hashtags: ['아보하', '거리인사', '소통브이로그'],
        },
    ];

    return (
        <div className="px-8 py-10 bg-gray-50 min-h-screen">
            <div className="relative flex mb-6">
                <button
                    className={`flex-1 pb-3.5 text-center text-[20px] font-bold leading-[28px] tracking-[-0.5px] relative ${
                        activeTab === 'report' ? 'text-primary-500' : 'text-gray-300'
                    }`}
                    onClick={() => setActiveTab('report')}
                >
                    최근 받아본 리포트
                    {activeTab === 'report' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10"></span>
                    )}
                </button>
                <button
                    className={`flex-1 pb-3.5 text-center text-[20px] font-bold leading-[28px] tracking-[-0.5px] relative ${
                        activeTab === 'scrap' ? 'text-primary-500' : 'text-gray-300'
                    }`}
                    onClick={() => setActiveTab('scrap')}
                >
                    스크랩
                    {activeTab === 'scrap' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10"></span>
                    )}
                </button>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-300"></span>
            </div>
            {activeTab === 'report' && (
                <div className="flex justify-between items-center ">
                    <div className="flex gap-8 mb-6">
                        <button
                            className={`px-4 py-2 rounded-lg font-bold leading-[24px] tracking-[-0.4px] ${
                                subTab === 'video' ? 'bg-red-500 ' : 'bg-gray-100 '
                            }`}
                            onClick={() => setSubTab('video')}
                        >
                            동영상
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-bold leading-[24px] tracking-[-0.4px] ${
                                subTab === 'shorts' ? 'bg-red-500' : 'bg-gray-100'
                            }`}
                            onClick={() => setSubTab('shorts')}
                        >
                            Shorts
                        </button>
                    </div>

                    <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px] ">
                        {reportData.length}개의 영상 리포트
                    </p>
                </div>
            )}
            {activeTab === 'scrap' && (
                <div className="flex ">
                    <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px] ">
                        {scrapData.length}개의 스크랩
                    </p>
                </div>
            )}
            <div className={activeTab === 'report' ? 'grid grid-cols-4 gap-6' : 'grid grid-cols-1  gap-6'}>
                {activeTab === 'report'
                    ? reportData.map((item) => <RecentReportCard key={item.id} item={item} />)
                    : scrapData.map((item) => <ScrapCard key={item.title} item={item} />)}
            </div>
        </div>
    );
}

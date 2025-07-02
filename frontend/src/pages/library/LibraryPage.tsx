import { useState } from 'react';
import RecentReportCard from './_components/RecentReportCard';
import ScrapCard from './_components/ScrapCard';
import type { LibraryItem, ScrapItem } from '../../types/library';

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'report' | 'scrap'>('report');

    // 리포트 예시 나중에 대체 (API필요)
    const reportData: LibraryItem[] = [
        {
            id: 1,
            title: '영상 제목 1',
            thumbnail: '/thumbnail1.png',
            channel: '채널 이름',
            daysAgo: 3,
        },
        {
            id: 2,
            title: '영상 제목 2',
            thumbnail: '/thumbnail2.png',
            channel: '채널 이름',
            daysAgo: 5,
        },
    ];

    // 스크랩 예시 나중에 대체
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
        <div className="px-8 py-10">
            <h1 className="text-4xl font-bold mb-16 ml-6">저장소</h1>

            <div className="relative flex mb-20">
                <button
                    className={`flex-1 pb-3.5 text-center font-semibold relative ${
                        activeTab === 'report' ? 'text-black' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('report')}
                >
                    최근 받아본 리포트
                    {activeTab === 'report' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-black z-10"></span>
                    )}
                </button>
                <button
                    className={`flex-1 pb-3.5 text-center font-semibold relative ${
                        activeTab === 'scrap' ? 'text-black' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveTab('scrap')}
                >
                    스크랩
                    {activeTab === 'scrap' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-black z-10"></span>
                    )}
                </button>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-200"></span>
            </div>

            <p className="mb-6 text-gray-500">
                {activeTab === 'report' ? `${reportData.length}개 영상` : `${scrapData.length}개 스크랩`}
            </p>

            {/* 카드 리스트 */}
            <div className={activeTab === 'report' ? 'flex flex-col gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
                {activeTab === 'report'
                    ? reportData.map((item) => <RecentReportCard key={item.id} item={item} />)
                    : scrapData.map((item) => <ScrapCard key={item.title} item={item} />)}
            </div>
        </div>
    );
}

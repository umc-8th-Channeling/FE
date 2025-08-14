import type { CommonResponse } from '../common'

// 영상 정보 조회 요청 타입
export type VideoDataDto = {
    videoId: number | undefined
}

export type VideoData = {
    videoId: number
    youtubeVideoId: string
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    videoCreatedDate: Date
    ChannelName: string
    lastUpdatedDate: Date
}

// 영상 정보 조회 응답 타입
export type ResponseVideoData = CommonResponse<VideoData>

// 리포트 조회(개요/분석/아이디어) 요청 타입
export type GetReportDto = {
    reportId: number
}

export type Idea = {
    ideaId: number
    title: string
    content: string
    hashTag: string
    isBookMarked: boolean
}

export type Trend = {
    trendKeywordId: number
    keywordType: 'REAL_TIME' | 'CHANNEL'
    keyword: string
    score: number
    createdAt: Date
}

// 리포트 개요 데이터 타입
export type ReportOverview = {
    reportId: number
    view: number
    viewTopicAvg: number
    viewChannelAvg: number
    likeCount: number
    likeTopicAvg: number
    likeChannelAvg: number
    comment: number
    commentTopicAvg: number
    commentChannelAvg: number
    concept: number
    seo: number
    revisit: number
    summary: string
    neutralComment: number
    adviceComment: number
    positiveComment: number
    negativeComment: number
}

// 리포트 분석 데이터 타입
export type ReportAnalysis = {
    reportId: number
    leaveAnalyze: string
    optimization: string
}

// 리포트 아이디어 데이터 타입
export type ReportIdea = {
    reportId: number
    idea: Idea[]
    trend: Trend[]
}

// 리포트 조회(개요/분석/아이디어) 응답 타입
export type ResponseReportOverview = CommonResponse<ReportOverview>
export type ResponseReportAnalysis = CommonResponse<ReportAnalysis>
export type ResponseReportIdea = CommonResponse<ReportIdea>

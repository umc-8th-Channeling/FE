import type { CommonResponse } from '../common'

export type GetReportAllDto = {
    reportId: number
}

export type ReportVideoBasic = {
    videoId: number
    title: string
    category: string
    uploadDate: Date
}

export type Report = {
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
    leaveAnalyze: string
    optimization: string
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

export type ReportAll = {
    video: ReportVideoBasic
    report: Report
    idea: Idea[]
    trend: Trend[]
}

export type ResponseReportAll = CommonResponse<ReportAll>

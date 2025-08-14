import type { RecommededVideos } from '../../types/main'

export const DUMMY_POPULAR: RecommededVideos = {
    list: [
        {
            videoId: 2,
            videoTitle: '헬스터디 3: 최애의 수능 응원',
            videoThumbnailUrl:
                'https://spangled-bridge-914.notion.site/image/attachment%3A98b7d8c1-b4cb-4d5d-b986-fafde4f6df5d%3Aimage.png?table=block&id=22608691-8f43-80b6-8012-f1c90b3b4ce2&spaceId=719616fc-abf0-4573-86e5-37abb50a4cfb&width=1130&userId=&cache=v2',
            videoCategory: 'PEOPLE_AND_BLOGS',
            viewCount: 3_200,
            uploadDate: new Date('2025-04-01T15:31:35'),
            isDummy: true,
        },
        {
            videoId: 3,
            videoTitle: '저 드디어 독립했어요!',
            videoThumbnailUrl:
                'https://spangled-bridge-914.notion.site/image/attachment%3A77a4c727-0e03-4344-bab2-477fc4fc8dab%3Aimage.png?table=block&id=22a08691-8f43-8057-9906-f248115469bf&spaceId=719616fc-abf0-4573-86e5-37abb50a4cfb&width=1950&userId=&cache=v2',
            videoCategory: 'PEOPLE_AND_BLOGS',
            viewCount: 21_300,
            uploadDate: new Date('2024-07-16T15:31:35'),
            isDummy: true,
        },
    ],
    listSize: 2,
    totalPage: 1,
    totalElements: 2,
    isFirst: true,
    isLast: true,
}

export const DUMMY_IMAGE =
    'https://spangled-bridge-914.notion.site/image/attachment%3Ad71de08e-3d09-44b2-9f7a-a34ce660ba18%3Atemp.jpg?table=block&id=22608691-8f43-805d-9a40-c6e8fe09ebca&spaceId=719616fc-abf0-4573-86e5-37abb50a4cfb&width=1360&userId=&cache=v2'

import type { Profile, ResponseChannelDto } from '../../../types/profile'
import { formatKoreanDate } from '../../../utils/format'

export function mapResponseToProfile(dto: ResponseChannelDto): Profile {
    return {
        imageUrl: dto.result.image,
        category: dto.result.channelHashTags,
        channelName: dto.result.name,
        channelUrl: dto.result.link,
        joinDate: formatKoreanDate(dto.result.joinDate.toString()),
    }
}

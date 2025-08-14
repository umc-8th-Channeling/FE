import type { ResponseChannelDto } from '../../../types/profile'

export function mapResponseToTarget(dto: ResponseChannelDto): string {
    return dto.result?.target ?? ''
}

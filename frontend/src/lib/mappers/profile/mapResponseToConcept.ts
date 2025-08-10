import type { ResponseChannelDto } from '../../../types/profile'

export function mapResponseToConcept(dto: ResponseChannelDto): string {
    return dto.result?.concept ?? ''
}

import { useMutation } from '@tanstack/react-query'
import { updateChannelTarget, updateChannelConcept } from '../../api/channel'

export const useUpdateChannelTarget = () =>
    useMutation({
        mutationFn: ({ channelId, target }: { channelId: number; target: string }) =>
            updateChannelTarget(channelId, target),
    })

export const useUpdateChannelConcept = () =>
    useMutation({
        mutationFn: ({ channelId, concept }: { channelId: number; concept: string }) =>
            updateChannelConcept(channelId, concept),
    })

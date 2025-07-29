import { ChannelConceptModal, LoginModal, ViewerModal } from './_components'
import { useState } from 'react'
import { useLoginStore } from '../../stores/LoginStore'
import { useAuthStore } from '../../stores/authStore'
import { useUpdateChannelConcept, useUpdateChannelTarget } from '../../hooks/mutations/channelMutations'

export const NavbarModalsContainer = () => {
    const { mutate: updateTarget } = useUpdateChannelTarget()
    const { mutate: updateConcept } = useUpdateChannelConcept()

    const { isLoginFlowOpen, step } = useLoginStore()
    const { closeLoginFlow, goToViewerStep, goToConceptStep } = useLoginStore().actions
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)

    const [viewerValue, setViewerValue] = useState('')
    const [channelConceptValue, setChannelConceptValue] = useState('')

    const channelId = useAuthStore((state) => state.user?.channelId)

    const finishLoginAndAuthenticate = () => {
        setAuthMember()
        closeLoginFlow()
    }

    return (
        <>
            {isLoginFlowOpen && (
                <>
                    {step === 'login' && (
                        <LoginModal
                            onClose={closeLoginFlow}
                            onLoginSuccess={() => {
                                setViewerValue('')
                                goToViewerStep()
                            }}
                        />
                    )}

                    {step === 'viewer' && (
                        <ViewerModal
                            onClose={closeLoginFlow}
                            value={viewerValue}
                            onChange={setViewerValue}
                            handleButtonClick={() => {
                                if (!channelId) {
                                    alert('채널 ID가 존재하지 않습니다. 로그인 상태를 확인해주세요.')
                                    return
                                }
                                updateTarget(
                                    { channelId, target: viewerValue },
                                    {
                                        onSuccess: (res) => {
                                            console.log(' updateChannelTarget 응답:', res)
                                            setChannelConceptValue('') // 다음 모달 입력창 초기화
                                            goToConceptStep()
                                        },
                                        onError: (err) => {
                                            console.error('타겟 저장 실패:', err)
                                            alert('타겟 저장 실패')
                                        },
                                    }
                                )
                            }}
                        />
                    )}

                    {step === 'concept' && (
                        <ChannelConceptModal
                            onClose={closeLoginFlow}
                            value={channelConceptValue}
                            onChange={setChannelConceptValue}
                            handleButtonClick={() => {
                                if (!channelId) {
                                    alert('채널 ID가 존재하지 않습니다. 로그인 상태를 확인해주세요.')
                                    return
                                }
                                updateConcept(
                                    { channelId, concept: channelConceptValue },
                                    {
                                        onSuccess: (res) => {
                                            console.log(' updateChannelConcept 응답:', res)
                                            setChannelConceptValue('') // 입력 초기화
                                            finishLoginAndAuthenticate()
                                        },
                                        onError: () => {
                                            alert('채널 콘셉트 저장 실패')
                                        },
                                    }
                                )
                            }}
                        />
                    )}
                </>
            )}
        </>
    )
}

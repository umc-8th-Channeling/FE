import { ChannelConceptModal, LoginModal, ViewerModal } from './_components'
import { useState } from 'react'
import { useLoginStore } from '../../stores/LoginStore'
import { useAuthStore } from '../../stores/authStore'
import { updateChannelConcept, updateChannelTarget } from '../../api/channel'

export const NavbarModalsContainer = () => {
    const { isLoginFlowOpen, step } = useLoginStore()
    const { closeLoginFlow, goToViewerStep, goToConceptStep } = useLoginStore().actions
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)

    const [viewerValue, setViewerValue] = useState('')
    const [channelConceptValue, setChannelConceptValue] = useState('')

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
                                updateChannelTarget(4, viewerValue) //실제 채널 ID로 변경해야됨
                                    .then(() => {
                                        setChannelConceptValue('') // 다음 거 초기화
                                        goToConceptStep()
                                    })
                                    .catch((err) => {
                                        console.error('타겟 저장 실패:', err)

                                        alert('타겟 저장 실패')
                                    })
                            }}
                        />
                    )}

                    {step === 'concept' && (
                        <ChannelConceptModal
                            onClose={closeLoginFlow}
                            value={channelConceptValue}
                            onChange={setChannelConceptValue}
                            handleButtonClick={() => {
                                updateChannelConcept(4, channelConceptValue) //실제 채널 ID로 변경해야됨
                                    .then(() => {
                                        setChannelConceptValue('') // 다음 거 초기화
                                        finishLoginAndAuthenticate()
                                    })
                                    .catch(() => {
                                        alert('채널 콘셉트 저장 실패')
                                    })
                            }}
                        />
                    )}
                </>
            )}
        </>
    )
}

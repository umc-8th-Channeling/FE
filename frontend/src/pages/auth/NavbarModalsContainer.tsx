import { ChannelConceptModal, LoginModal, ViewerModal } from './_components'
import { useState } from 'react'
import { useLoginStore } from '../../stores/LoginStore'
import { useAuthStore } from '../../stores/authStore'

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
                                setChannelConceptValue('')
                                goToConceptStep()
                            }}
                        />
                    )}

                    {step === 'concept' && (
                        <ChannelConceptModal
                            onClose={closeLoginFlow}
                            value={channelConceptValue}
                            onChange={setChannelConceptValue}
                            handleButtonClick={finishLoginAndAuthenticate}
                        />
                    )}
                </>
            )}
        </>
    )
}

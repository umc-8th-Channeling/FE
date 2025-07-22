import { ChannelConceptModal, LoginModal, ViewerModal } from '../../../pages/main/_components'
import { useState } from 'react'
import { useLoginStore } from '../../../stores/LoginStore'

export const NavbarModalsContainer = () => {
    const { isLoginFlowOpen, step } = useLoginStore()
    const { closeLoginFlow, goToViewerStep, goToConceptStep } = useLoginStore().actions

    const [viewerValue, setViewerValue] = useState('')
    const [channelConceptValue, setChannelConceptValue] = useState('')

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
                            handleButtonClick={closeLoginFlow}
                        />
                    )}
                </>
            )}
        </>
    )
}

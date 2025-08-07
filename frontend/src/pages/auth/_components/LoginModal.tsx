import Modal from '../../../components/Modal'
import GoogleIcon from '../../../assets/icons/google.svg?react'

export const LoginModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal
            title="로그인/회원가입"
            description={'해당 채널에 대한 로그인이 필요합니다!\n구글 계정으로 10초만에 로그인하세요.'}
            onClose={onClose}
        >
            <button
                type="button"
                className="
                    flex items-center py-4 px-6
                    gap-4 rounded-xl
                    bg-gray-300 hover:bg-neutral-white-opacity20
                    text-gray-900 font-bold text-base leading-6 tracking-[-0.4px] text-center
                "
                onClick={() => {
                    // 1) 실제로는 여기서 구글 로그인 처리하고,

                    window.location.href = import.meta.env.VITE_SERVER_API_URL + '/members/login/google'
                }}
            >
                <GoogleIcon className="w-5 h-5" />
                구글계정으로 로그인
            </button>
        </Modal>
    )
}

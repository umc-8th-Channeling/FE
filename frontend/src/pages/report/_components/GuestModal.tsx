import * as motion from 'motion/react-client'
import X from '../../../assets/icons/X.svg?react'

export const GuestModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="absolute top-0 flex justify-center w-full">
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 24, 16, 20] }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                }}
                className="
                    flex flex-row items-center px-4 py-2 space-x-2 rounded-lg bg-surface-elevate-l2
                    whitespace-pre-line tablet:whitespace-nowrap text-center text-[16px] leading-[150%] tracking-[-0.4px]
                "
            >
                <span>
                    이 리포트는 <span className="font-bold text-primary-500">데모 데이터</span>를 기반으로 제공됩니다.
                    {'\n'}로그인하시면 내 영상의 리포트를 확인하실 수 있습니다.
                </span>

                <button onClick={onClose} className="cursor-pointer">
                    <X />
                </button>
            </motion.div>
        </div>
    )
}

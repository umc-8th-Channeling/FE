import * as motion from 'motion/react-client'

export const GeneratingModal = () => {
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
                    whitespace-pre-line tablet:whitespace-nowrap text-center text-[14px] tablet:text-[16px] leading-[150%] tracking-[-0.4px]
                "
            >
                <span>
                    잠깐! 이 리포트는 <span className="font-bold text-primary-500">아직 생성 중</span>입니다.{'\n'} 금방
                    생성이 끝나니 잠시만 기다려 주세요.
                </span>
            </motion.div>
        </div>
    )
}

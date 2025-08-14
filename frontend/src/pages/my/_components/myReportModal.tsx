import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import usePostVideoReport from '../../../hooks/my/usePostVideoReport'

interface MyReportModalProps {
    title: string
    setOpen: (open: boolean) => void
    videoId: number
}

export const MyReportModal = ({ title, setOpen, videoId }: MyReportModalProps) => {
    const navigate = useNavigate()

    const { mutate, isPending } = usePostVideoReport({
        onSuccess: (data, videoId) => {
            console.log('리포트 요청 성공:', data, 'videoId:', videoId)
            alert('리포트 요청이 접수되었습니다.')
            setOpen(false)
            navigate('/report')
        },
        onError: (err) => {
            console.error(err)
            alert('리포트 요청 실패')
        },
    })

    const getReport = () => {
        mutate({ videoId })
    }

    return (
        <Modal
            title="해당 영상에 대한 리포트를 받아 보시겠어요?"
            description={`‘${title}’을 유튜버님의 타겟과 컨셉을 고려하여 분석해요.`}
            onClose={() => setOpen(false)}
            className="w-[486px]"
        >
            <div className="flex justify-end">
                <div className="flex justify-between w-[214px] h-[40px] items-end">
                    <button
                        className="w-[101px] h-[40px] text-[16px] font-bold text-gray-600 border-[1px] border-gray-300 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        취소
                    </button>
                    <button
                        className="w-[103px] h-[40px] text-[16px] font-bold text-gray-900 bg-primary-500 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer"
                        onClick={getReport}
                        disabled={isPending}
                    >
                        리포트 받기
                    </button>
                </div>
            </div>
        </Modal>
    )
}

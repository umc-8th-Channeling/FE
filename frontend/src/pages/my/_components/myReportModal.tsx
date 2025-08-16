import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import usePostReportById from '../../../hooks/report/usePostReportById'
import { getJosa } from '../../../utils/format'

interface MyReportModalProps {
    title: string
    setOpen: (open: boolean) => void
    videoId: number
}

export const MyReportModal = ({ title, setOpen, videoId }: MyReportModalProps) => {
    const navigate = useNavigate()

    const { mutate: requestNewReport, isPending } = usePostReportById({
        onSuccess: ({ reportId }) => {
            setOpen(false)
            navigate(`/report/${reportId}?video=${videoId}`)
        },
        onError: (err) => {
            console.error('내 영상으로 리포트 생성 요청 중 오류 발생:', err)
        },
    })

    const getReport = () => {
        requestNewReport({ videoId })
    }

    return (
        <Modal
            title="해당 영상에 대한 리포트를 받아 보시겠어요?"
            description={`‘${title}’${getJosa(title, '을/를')} 유튜버님의 타겟과 컨셉을 고려하여 분석해요.`}
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

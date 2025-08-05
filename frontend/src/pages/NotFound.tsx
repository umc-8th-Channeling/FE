import { Link } from 'react-router-dom'
import ChannelingLogo from '../assets/icons/channelingLogo.svg?react'

export default function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center h-full bg-gradient-to-b from-gray-50 to-primary-50">
            <h1 aria-label="404" className="flex flex-row justify-center items-center gap-[10px]">
                <span className="sr-only">404</span>
                <span aria-hidden="true" className="text-[80px] tablet:text-[100px] leading-[140%] trakcing-[-2.5px]">
                    4
                </span>
                <ChannelingLogo aria-hidden="true" className="size-20" />
                <span aria-hidden="true" className="text-[80px] tablet:text-[100px] leading-[140%] trakcing-[-2.5px]">
                    4
                </span>
            </h1>

            <h3
                className="
                    mb-2 text-center text-primary-500 text-[16px] tablet:text-[20px] font-medium leading-[140%] tracking-[-0.5px]
                    whitespace-pre-line tablet:whitespace-nowrap 
                "
            >
                죄송합니다.{'\n'} 현재 찾을 수 없는 페이지를 요청 하셨습니다.
            </h3>
            <p
                className="
                    mb-10 text-center text-[12px] tablet:text-[16px] leading-[150%] tracking-[-0.4px]
                    whitespace-pre-line tablet:whitespace-nowrap 
                "
            >
                존재하지 않는 주소를 입력하셨거나,{'\n'} 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </p>

            <Link to="/" className="cursor-pointer px-4 py-2 border-2 border-primary-500 rounded-2xl">
                <span className="text-primary-500 text-[14px] tablet:text-[16px] font-bold leading-[150%] tracking-[-0.4px]">
                    홈으로 이동
                </span>
            </Link>
        </div>
    )
}

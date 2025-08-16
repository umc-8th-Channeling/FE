import { useFetchMyProfile } from '../../../hooks/setting/useFetchMyProfile'
import { memo } from 'react'
import type { User } from '../../../types/channel'

interface NavbarUserInfoProps {
    user: User
    onUserClick: () => void
}

const NavbarUserInfoComponent = ({ onUserClick }: NavbarUserInfoProps) => {
    const { data } = useFetchMyProfile()

    if (!data) return null

    return (
        <>
            <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={onUserClick}>
                <img src={`${data.profileImage}`} alt="프로필" className="size-10 tablet:size-12 rounded-full mb-1" />
                <span className="text-[24px] leading-[150%] font-medium tracking-[-0.6px] desktop:hidden">
                    {data.nickname}
                </span>
            </div>
        </>
    )
}

export const NavbarUserInfo = memo(NavbarUserInfoComponent)

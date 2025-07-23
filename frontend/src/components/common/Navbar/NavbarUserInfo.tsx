import type { DUMMY_USER } from './dummy'

interface NavbarUserInfoProps {
    user: typeof DUMMY_USER
    onClick?: () => void
}

export const NavbarUserInfo = ({ user }: NavbarUserInfoProps) => {
    return (
        <div className="flex flex-row items-center gap-2 cursor-pointer">
            <img src={user.profileImage} alt="프로필" className="size-10 tablet:size-12 rounded-full mb-1" />
            <span className="text-[24px] leading-[150%] font-medium trakcing-[-0.6px] desktop:hidden">{user.name}</span>
        </div>
    )
}

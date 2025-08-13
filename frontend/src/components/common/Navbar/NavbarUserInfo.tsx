import { useFetchMyProfile } from '../../../hooks/queries/fetchMyProfile'

interface NavbarUserInfoProps {
    onUserClick: () => void
}

export const NavbarUserInfo = ({ onUserClick }: NavbarUserInfoProps) => {
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

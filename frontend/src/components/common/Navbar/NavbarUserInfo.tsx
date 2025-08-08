import ProfileImage from '../../../pages/setting/_components/ProfileImage'
import { useAuthStore } from '../../../stores/authStore'
import type { User } from '../../../types/channel'

interface NavbarUserInfoProps {
    user: User
    onUserClick: () => void
}

export const NavbarUserInfo = ({ onUserClick }: NavbarUserInfoProps) => {
    const { user } = useAuthStore()

    return (
        <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={onUserClick}>
            <ProfileImage imageUrl={user?.profileImage ?? null} className="size-10 tablet:size-12 mb-1" />

            <span className="text-[24px] leading-[150%] font-medium tracking-[-0.6px] desktop:hidden">
                {user?.nickname ?? 'user 1'}
            </span>
        </div>
    )
}

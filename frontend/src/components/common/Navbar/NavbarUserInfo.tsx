import type { DUMMY_USER } from './dummy'

interface NavbarUserInfoProps {
    user: typeof DUMMY_USER
    onClick?: () => void
}

export const NavbarUserInfo = ({ user, onClick }: NavbarUserInfoProps) => {
    return (
        <div className="flex flex-col items-center py-2" onClick={onClick}>
            <img src={user.profileImage} alt="프로필" className="w-12 h-12 rounded-full mb-1" />
            {/* <span className="font-caption">{user.name}</span>
            <span className="font-caption">{user.id}</span> */}
        </div>
    )
}

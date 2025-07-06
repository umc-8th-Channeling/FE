/* 로그인 성공 시
type NavbarUserInfoProps = {
    user: {
        name: string;
        id: string;
        photo: string;
    };
};

export const NavbarUserInfo = ({user}: NavbarUserInfoProps) : React.ReactElement => {
    return (
        <div className="flex flex-col items-center py-2">
            <img src={user.photo} alt="프로필" className="w-12 h-12 rounded-full mb-1" />
            <span className="font-caption">{user.name}</span>
            <span className="font-caption">{user.id}</span>
        </div>
    );
};
*/
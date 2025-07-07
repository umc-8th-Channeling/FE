// import React from "react";
import { type Profile } from '../profile'

interface ProfileCardProps {
    profile: Profile
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <div className="flex w-[588px] h-[180px] ">
            <div className="flex items-center">
                <span className="w-[180px] h-[180px] rounded-full object-cover bg-pink-400"></span>
            </div>
            <div className="mt-[28px] ml-[24px] gap-[8px]">
                <div className="flex justify-center items-center w-[100px] h-[28px] whitespace-nowrap px-[8px] py-[4px] bg-[#ad263f] rounded-[2px]">
                    <span className="  text-[#fff] text-[14px] font-medium ">{profile.category}</span>
                </div>
                <div className="text-[#fff]  h-[34px] text-[24px] font-bold]">{profile.channelName}</div>
                <div>
                    <a
                        href={profile.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-[24px] text-[#fff] text-[16px] font-medium underline"
                    >
                        {profile.channelName} 채널 바로가기
                    </a>
                </div>
                <div className="h-[24px] text-[#fff] text-[16px] font-medium">가입일: {profile.joinDate}</div>
            </div>
        </div>
    )
}
export default ProfileCard

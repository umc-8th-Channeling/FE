// import React from "react";
import { type Profile } from '../profile'
import Linkto from '../../../assets/icons/linkto.svg?react'

interface ProfileCardProps {
    profile: Profile
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <div className="flex w-[588px] h-[180px] ">
            <div className="flex items-center">
                <span className="w-[180px] h-[180px] rounded-full object-cover bg-pink-400"></span>
            </div>
            <div className="flex flex-col w-[384px] items-start mt-[28px] ml-[24px] gap-0.5">
                <div className="flex justify-center items-center w-[100px] h-[28px] whitespace-nowrap bg-[#fa4d56]/50 rounded-[2px]">
                    <span className="  text-[#fff] text-[14px] font-medium leading-[140%] tracking-[-0.35px]">
                        {profile.category}
                    </span>
                </div>
                <div className="text-[#fff]  h-[34px] text-[24px] font-bold leading-[140%] tracking-[-0.6px]">
                    {profile.channelName}
                </div>
                <div>
                    <a
                        href={profile.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex overflow-hidden text-ellipsis items-center justify-center h-[24px] text-[#fff] text-[16px] font-medium underline decoration-solid underline-offset-2 decoration-from-font leading-[150%] tracking-[-0.4px]"
                    >
                        <Linkto className="mr-[8px]" />
                        {profile.channelName} 채널 바로가기
                    </a>
                </div>
                <div className="h-[24px] text-[#fff] text-[16px] font-medium leading-[150%] tracking-[-0.4px]">
                    가입일: {profile.joinDate}
                </div>
            </div>
        </div>
    )
}
export default ProfileCard

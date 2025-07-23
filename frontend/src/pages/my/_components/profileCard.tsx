// import React from "react";
import { type Profile } from '../../../types/profile'
import Linkto from '../../../assets/icons/linkto.svg?react'

interface ProfileCardProps {
    profile: Profile
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <div className="flex w-full min-w-0 h-[200px] items-center gap-[24px] ">
            <span className="w-full max-w-[180px] aspect-square rounded-full object-cover bg-pink-400"></span>
            <div className="flex flex-col items-start gap-[8px]  ">
                <div className="flex items-start px-[8px] py-[4px] gap-[8px] whitespace-nowrap bg-[#fa4d56]/50 rounded-[2px] ">
                    <span className="text-gray-900 text-[14px] font-medium leading-[140%] tracking-[-0.35px]">
                        {profile.category}
                    </span>
                </div>
                <div className="text-gray-900 text-[24px] font-bold leading-[140%] tracking-[-0.6px]">
                    {profile.channelName}
                </div>
                <div>
                    <a
                        href={profile.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex overflow-hidden text-ellipsis items-center justify-center h-[24px] text-gray-900 text-[16px] font-medium underline decoration-solid underline-offset-2 decoration-from-font leading-[150%] tracking-[-0.4px] whitespace-nowrap"
                    >
                        <Linkto className="mr-[8px]" />
                        {profile.channelName} 채널 바로가기
                    </a>
                </div>
                <div className="flex items-end gap-[8px] overflow-hidden text-ellipsis text-gray-900 text-[16px] font-medium leading-[150%] tracking-[-0.4px]">
                    가입일: {profile.joinDate}
                </div>
            </div>
        </div>
    )
}
export default ProfileCard

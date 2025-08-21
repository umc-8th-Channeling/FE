// import React from "react";
import { type Profile } from '../../../types/profile'
import Linkto from '../../../assets/icons/linkto.svg?react'

interface ProfileCardProps {
    profile: Profile
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <div className="flex w-full min-w-0 h-[200px] items-center gap-[24px] ">
            <img className="w-full max-w-[180px] aspect-square rounded-full object-cover" src={`${profile.imageUrl}`} />
            <div className="flex flex-col items-start gap-[8px]  ">
                <div className="flex items-start px-[8px] py-[4px] gap-[8px] whitespace-nowrap bg-[#fa4d56]/50 rounded-[2px] ">
                    <span className="text-gray-900 font-caption-14m">{profile.category}</span>
                </div>
                <div className="text-gray-900 font-title-24b">{profile.channelName}</div>
                <div>
                    <a
                        href={profile.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex overflow-hidden text-ellipsis items-center justify-center h-[24px] text-gray-900 underline decoration-solid underline-offset-2 decoration-from-font whitespace-nowrap font-body-16m"
                    >
                        <Linkto className="mr-[8px]" />
                        {profile.channelName} 채널 바로가기
                    </a>
                </div>
                <div className="flex items-end gap-[8px] overflow-hidden text-ellipsis text-gray-900 font-body-16m">
                    가입일: {profile.joinDate}
                </div>
            </div>
        </div>
    )
}
export default ProfileCard

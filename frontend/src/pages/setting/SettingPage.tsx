import { useState } from 'react'
import { Button } from './components/SettingButton'
import { Label } from './components/SettingLabel'
import Input from './components/SettingInput'
import '../../styles/scrollbar.css'

export default function SettingPage() {
    const [formData, setFormData] = useState({
        instagram: '',
        tiktok: '',
        facebook: '',
        x: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-[#262626] text-white w-[792px] max-h-[90vh] rounded-xl overflow-hidden flex flex-col">
                <div className="flex w-[792px] h-19 px-6 justify-between items-center flex-shrink-0 bg-[#262626]">
                    <h2 className="font-setting-fixed">설정</h2>
                </div>

                <div className="flex">
                    {/* 사이드바 */}
                    <div className="flex flex-col justify-between items-start self-stretch p-4 w-[167px] box-border bg-[#161616]">
                        <div className="flex flex-col gap-y-4">
                            <Button variant="secondary" className="w-full">
                                계정 및 프로필 설정
                            </Button>
                            <Button variant="ghost" className="w-full text-left">
                                동의
                            </Button>
                        </div>
                        <Button variant="ghost" className="w-full text-left text-red-500 mt-auto">
                            로그아웃
                        </Button>
                    </div>

                    {/* 스크롤 영역 */}
                    <div
                        className="w-[625px] h-[524px] self-stretch flex flex-col
                    items-end p-8 gap-10 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-10 w-full">
                            <div className="flex items-center justify-center h-full gap-4">
                                <div
                                    className="w-[100px] h-[100px] rounded-[100px] bg-cover bg-no-repeat bg-center"
                                    style={{
                                        backgroundImage: `url('/path-to-image.jpg)`,
                                        backgroundColor: 'lightgray',
                                    }}
                                ></div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="font-body text-[#A8A8A8]">닉네임</Label>
                                <div className="font-title text-[#F4F4F4]">찰스엔터</div>
                            </div>

                            <div>
                                <Label className="font-body text-[#A8A8A8]">이메일</Label>
                                <div className="font-title text-[#F4F4F4]">kjh213513@gmail.com</div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label className="font-body text-[#F4F4F4]">SNS 링크 추가</Label>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-caption text-[#A8A8A8]">인스타그램</Label>
                                    <Input
                                        name="instagram"
                                        placeholder="SNS 링크를 입력해주세요."
                                        value={formData.instagram}
                                        onChange={handleChange}
                                    />
                                    <Label className="font-caption text-[#A8A8A8]">틱톡</Label>
                                    <Input
                                        name="tiktok"
                                        placeholder="SNS 링크를 입력해주세요."
                                        value={formData.tiktok}
                                        onChange={handleChange}
                                    />
                                    <Label className="font-caption text-[#A8A8A8]">페이스북</Label>
                                    <Input
                                        name="facebook"
                                        placeholder="SNS 링크를 입력해주세요."
                                        value={formData.facebook}
                                        onChange={handleChange}
                                    />
                                    <Label className="font-caption text-[#A8A8A8]">X</Label>
                                    <Input
                                        name="x"
                                        placeholder="SNS 링크를 입력해주세요."
                                        value={formData.x}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button className="w-full">탈퇴하기</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

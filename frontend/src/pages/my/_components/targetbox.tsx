const Targetbox=()=>{
    return(
        <div className=" flex w-[1200px] h-[100px]">
            <div className="flex h-[28px]">
                <div className=" text-gray-900 font-bold text-[20px] ">시청자 타겟
                </div>
                <div className="gap-[4px]">
                    <div className="text-gray-900 text-[16px]">수정</div>
                </div>
            </div>
            <div className=" w-[1200px] h-[56px] p-[16px] rounded-[16px] bg-white opacity-10">
                <div className="text-[16px]">유튜버님의 시청자 타겟에 대한 설명을 입력해주세요.</div>
            </div>
        </div>
    )
};

export default Targetbox;
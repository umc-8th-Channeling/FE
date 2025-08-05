import Correction from '../assets/icons/correction.svg?react'

interface EditButtonProps {
    onClick: () => void
    buttonColor: string
    label: string
}

export const EditButton = ({ onClick, buttonColor, label }: EditButtonProps) => {
    return (
        <div className="flex items-end gap-[4px] cursor-pointer" onClick={onClick}>
            <Correction className={`${buttonColor}`} />
            <div className={`text-[16px] font-medium whitespace-nowrap leading-[150%] tracking-[-2.5%] ${buttonColor}`}>
                {label}
            </div>
        </div>
    )
}

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
            <div className={`font-body-16m whitespace-nowrap ${buttonColor}`}>{label}</div>
        </div>
    )
}

interface CustomToggleProps {
    id: string
    checked: boolean
    onChange: (val: boolean) => void
}

const CustomToggle = ({ id, checked, onChange }: CustomToggleProps) => {
    return (
        <label
            htmlFor={id}
            className={`
                relative cursor-pointer flex items-center w-[42px] h-6 rounded-xl 
                transition-colors duration-300 ${checked ? 'bg-primary-500' : 'bg-gray-300'}
            `}
        >
            <span className="sr-only">토글 버튼</span>
            <input id={id} type="checkbox" checked={checked} onChange={() => onChange(!checked)} className="hidden" />
            <span
                className={`m-[3px] size-[18px] rounded-full bg-gray-900 shadow-md 
                    transition-transform duration-300 ${checked ? 'translate-x-[18px]' : 'translate-x-0'}`}
            />
        </label>
    )
}

export default CustomToggle

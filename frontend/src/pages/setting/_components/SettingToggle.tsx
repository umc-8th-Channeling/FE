import ToggleOnIcon from '../../../assets/icons/toggle_on.svg?react'
import ToggleOffIcon from '../../../assets/icons/toggle_off.svg?react'

type ToggleProps = {
    checked: boolean
    onChange: (val: boolean) => void
}

export default function SettingToggle({ checked, onChange }: ToggleProps) {
    const Icon = checked ? ToggleOnIcon : ToggleOffIcon

    return (
        <button onClick={() => onChange(!checked)} aria-label={checked ? '활성화됨' : '비활성화됨'}>
            <Icon />
        </button>
    )
}

import ToggleOnIcon from '../../../assets/icons/toggle_on.svg'
import ToggleOffIcon from '../../../assets/icons/toggle_off.svg'

type ToggleProps = {
    checked: boolean
    onChange: (val: boolean) => void
}

export default function SettingToggle({ checked, onChange }: ToggleProps) {
    return (
        <button onClick={() => onChange(!checked)}>
            <img src={checked ? ToggleOnIcon : ToggleOffIcon} alt={checked ? '활성화됨' : '비활성화됨'} />
        </button>
    )
}

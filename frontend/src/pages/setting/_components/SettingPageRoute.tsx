import { useNavigate } from 'react-router-dom'
import SettingPage from '../SettingPage'

export default function SettingPageRoute() {
    const navigate = useNavigate()
    return <SettingPage onClose={() => navigate(-1)} />
}

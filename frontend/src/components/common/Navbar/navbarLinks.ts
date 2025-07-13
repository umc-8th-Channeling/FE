import HomeIcon from '../../../assets/icons/home.svg'
import PlusIcon from '../../../assets/icons/plus.svg'
import MyChannelIcon from '../../../assets/icons/mychannel.svg'
import StoreIcon from '../../../assets/icons/store.svg'
import HomeWhiteIcon from '../../../assets/icons/home_hover.svg'
import MyChannelWhiteIcon from '../../../assets/icons/mychannel_hover.svg'
import StoreWhiteIcon from '../../../assets/icons/store_hover.svg'
import HomeRedIcon from '../../../assets/icons/home_active.svg'
import MyChannelRedIcon from '../../../assets/icons/mychannel_active.svg'
import StoreRedIcon from '../../../assets/icons/store_active.svg'
import LoginIcon from '../../../assets/icons/login.svg'

export type LinkItem = {
    to: string
    defaultIcon: string
    hoverIcon?: string
    activeIcon?: string
    alt: string
    label?: string
    isCircle: boolean
    size?: 'sm' | 'md' | 'lg'
    action?: string
}

export const LINKS: LinkItem[] = [
    {
        to: '/report',
        defaultIcon: PlusIcon,
        hoverIcon: PlusIcon,
        activeIcon: PlusIcon,
        alt: '새로운 분석 아이콘',
        isCircle: true,
    },
    {
        to: '/',
        defaultIcon: HomeIcon,
        hoverIcon: HomeWhiteIcon,
        activeIcon: HomeRedIcon,
        alt: '홈 아이콘',
        label: '홈',
        isCircle: false,
    },
    {
        to: '/my',
        defaultIcon: MyChannelIcon,
        hoverIcon: MyChannelWhiteIcon,
        activeIcon: MyChannelRedIcon,
        alt: '내 채널 아이콘',
        label: '내 채널',
        isCircle: false,
    },
    {
        to: '/library',
        defaultIcon: StoreIcon,
        hoverIcon: StoreWhiteIcon,
        activeIcon: StoreRedIcon,
        alt: '저장소 아이콘',
        label: '저장소',
        isCircle: false,
    },
    {
        to: '',
        defaultIcon: LoginIcon,
        hoverIcon: LoginIcon,
        activeIcon: LoginIcon,
        alt: '로그인 아이콘',
        label: '로그인',
        isCircle: false,
        size: 'lg',
        action: 'login',
    },
]

export const TOP_LINKS = LINKS.filter((link) => link.action !== 'login')
export const BOTTOM_LINKS = LINKS.filter((link) => link.action === 'login')

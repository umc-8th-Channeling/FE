import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        const scrollContainer = document.getElementById('scroll-container')
        if (scrollContainer) {
            scrollContainer.scrollTop = 0
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname])

    return null
}

import RootLayoutDesktop from './RootLayoutDesktop'
import RootLayoutMobile from './RootLayoutMobile'
import RootLayoutTablet from './RootLayoutTablet'

export default function RootLayout() {
    return (
        <>
            <RootLayoutDesktop />
            <RootLayoutTablet />
            <RootLayoutMobile />
        </>
    )
}

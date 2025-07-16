import RootLayoutDesktop from './RootLayoutDesktop'
import RootLayoutMobile from './RootLayoutMobile'
import RootLayoutTablet from './RootLayoutTablet'
import ReportLoadingSpinner from '../../components/ReportLoadingSpinner'

export default function RootLayout() {
    return (
        <>
            <RootLayoutDesktop />
            <RootLayoutTablet />
            <RootLayoutMobile />

            <ReportLoadingSpinner />
        </>
    )
}

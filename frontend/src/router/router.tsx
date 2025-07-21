import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../pages/layouts/RootLayout'
import MainPage from '../pages/main/MainPage'
import LibraryPage from '../pages/library/LibraryPage'
import ReportPage from '../pages/report/ReportPage'
import MyPage from '../pages/my/MyPage'
import SettingPage from '../pages/setting/SettingPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: '/report',
                element: <ReportPage />,
            },
            {
                path: '/my',
                element: <MyPage />,
            },
            {
                path: '/library',
                element: <LibraryPage />,
            },
            {
                path: '/setting',
                element: <SettingPage />,
            },
        ],
    },
])

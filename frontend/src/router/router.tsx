import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import MainPage from '../pages/main/MainPage'
import LibraryPage from '../pages/library/LibraryPage'
import ReportPage from '../pages/report/ReportPage'
import MyPage from '../pages/my/MyPage'
import GoogleLoginRedirectPage from '../pages/auth/GoogleRedirectPage'
import NotFoundPage from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            // {
            //     path: '/report/dummy/:reportId',
            //     element: <DummyReportPage />,
            // },
            {
                path: '/report/:reportId',
                element: (
                    <ProtectedRoute>
                        <ReportPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/my',
                element: (
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/library',
                element: (
                    <ProtectedRoute>
                        <LibraryPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/auth/callback',
                element: <GoogleLoginRedirectPage />,
            },
            {
                path: '/*',
                element: <NotFoundPage />,
            },
        ],
    },
])

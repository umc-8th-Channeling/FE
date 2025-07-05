import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <div>
            {/* sidebar 위치 */}
            <main>
                <Outlet />
            </main>
            {/* footer 위치 */}
        </div>
    );
}

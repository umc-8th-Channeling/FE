import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LibraryPage from './pages/library/LibraryPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/library" element={<LibraryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

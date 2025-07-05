<<<<<<< HEAD
import { Footer } from './components/common/Footer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavbarWrapper } from './components/common/Navbar/NavbarWrapper'

function App() {

  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-[#262626]">
      <NavbarWrapper />
      <main className="flex-1 flex justify-center items-center bg-[#262626]">
        <Routes>
          <Route path="/" element={<div className="text-red-300">Channeling</div>} />
          <Route path="/new" element={<div className="text-red-300">새로운 분석</div>} />
          <Route path="/my_channel" element={<div className="text-red-300">내 채널</div>} />
          <Route path="/storage" element={<div className="text-red-300">저장소</div>} />
          <Route path="/login" element={<div className="text-red-300">로그인</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  )

=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LibraryPage from './pages/library/LibraryPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/library" element={<LibraryPage />} />
                {/* <p>타이포 및 컬러시스템</p>
                <div className="grid grid-cols-2">
                    <div>
                        <div className="text-primary-50 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-100 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-200 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-300 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-400 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-500 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-600 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-700 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-800 text-5xl font-bold">Dark/Primary</div>
                        <div className="text-primary-900 text-5xl font-bold">Dark/Primary</div>
                    </div>

                    <div>
                        <div className="text-gray-50 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-100 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-200 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-300 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-400 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-500 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-600 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-700 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-800 text-5xl font-bold">Dark/Grayscale</div>
                        <div className="text-gray-900 text-5xl font-bold">Dark/Grayscale</div>
                    </div>
                </div> */}
            </Routes>
        </BrowserRouter>
    );
>>>>>>> 4d86f1bfec59c79a632db9a920af154e83d2ab0b
}

export default App

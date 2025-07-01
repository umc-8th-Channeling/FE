import { Footer } from './components/common/Footer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavbarWrapper } from './components/common/Navbar/NavbarWrapper'

function App() {

  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-[#262626]">
      <NavbarWrapper />
      <main className="flex-1 flex justify-center items-center bg-gradient-to-b from-[#161616] to-[#2D0709]">
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

}

export default App

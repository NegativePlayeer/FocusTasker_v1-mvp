import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from "@/pages/LoginPage.tsx";
import Dashboard from "@/pages/Dashboard.tsx"
import SignUpPage from "@/pages/SignUpPage.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
  </BrowserRouter>
)

import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import { isAuthenticated } from './services/auth';
import { useEffect, useState } from 'react';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={  isAuthenticated() ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

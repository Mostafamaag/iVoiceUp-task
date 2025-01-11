import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoginForm from './components/LoginFrom.tsx'
import EmployeeList from './components/EmployeeList.tsx'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  //  <StrictMode>
  // <App />
  // </StrictMode>,
 
    <App />
  
)

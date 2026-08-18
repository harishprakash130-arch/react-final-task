import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter 
    future= {{
      v7_startTransition:true,
      v7_relativeSplatPath:true,
    }}>
      <ThemeProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
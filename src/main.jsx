import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { WorkspacesProvider } from './Contextos/contextos.jsx'
import AuthContextProvider from './Context/auth.context.jsx'



createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
    <WorkspacesProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </WorkspacesProvider>
    </AuthContextProvider>
    
)

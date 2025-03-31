import React, { useContext } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/auth.context'





const ProtectedRoute = () => {
    
    const {isAuthenticationInitialState} = useContext(AuthContext) 
  return (
    isAuthenticationInitialState
    ? <Outlet/>  
    : <Navigate to= {"/login"} />
  )
}

export default ProtectedRoute
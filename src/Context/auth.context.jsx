import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext()


const AuthContextProvider = ({ children }) => {
    let isAuthenticationInitialState = sessionStorage.getItem('authorization_token') // buscamos si en el sesion storage hay un token de autenticacion
    const [isAuthenticationState, setIsAuthenticationInitialState] = useState(isAuthenticationInitialState)
    useEffect(() => { // hacemos un efecto por si el usuario en algun  momento recarga la pag, se cargue el efecto y nos aseguramos que este identifacado
        const token = sessionStorage.getItem('authorization_token')
        if(token){
            setIsAuthenticationInitialState(true)
        } 
    },
    []
)
// funcion para cerrar sesion, le sacamos el authoization token y cambiamos el estado a falso
const logout = () => {
    sessionStorage.removeItem('authorization_token')
    setIsAuthenticationInitialState(false)
}

//LOGIN: LO USAMOS EN LOGINSCREEN
    const login = (authorization_token) =>{ // recibo el token de autenticacion y lo guardo en el sesion storage
        sessionStorage.setItem('authorization_token', authorization_token)
        setIsAuthenticationInitialState(true)
    }
    return(
        <AuthContext.Provider value={{isAuthenticationInitialState, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from '../hooks/useForm';
import { useApiRequest } from '../hooks/useApiRequest';
import ENVIROMENT from '../config/enviroment';
import '../Styles/Login_Register.css'
import { AuthContext } from '../Context/auth.context';

const LoginScreen = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const initialForm = {
        email: '',
        password: ''
    }

    const {formState, handleChangeInput} = useForm(initialForm)
    const {responseApiState, postRequest} = useApiRequest(ENVIROMENT.URL_API + '/api/auth/login')

    useEffect(() => {
        if (responseApiState.data) {
          const token = responseApiState.data.data.authorization_token;
          login(token);  // Esto es para el contexto si lo usas
          localStorage.setItem('token', token);  // Guardar en localStorage
        }
      }, [responseApiState]);
      
useEffect(()=>{
    if(responseApiState.data){
        navigate('/workspaces')
    }
})
const handleSubmitForm = async (e) =>{
    e.preventDefault()
    await postRequest(formState)
    
    login(responseApiState.data.data.authorization_token) 
    
}
    
  return (
    <div className='contenedorPadreLogin'>

        <div className='contenedorLogin'>
        <div>
            <div className='contenedorH1Login'>
                <h1 className='h1Login'>Inicia sesion en nuestra pagina</h1>
        </div>

            </div>
        
    
    <form className='formLogin' onSubmit={handleSubmitForm}>
        <div>
            <label  className='labelLogin' htmlFor='email'>Email</label>
            <input className='inputLogin'
                type="email" 
                id='email' 
                name='email' 
                placeholder='joedoe@mail.com' 
                value={formState.email} 
                onChange={handleChangeInput} 
            />
        </div>
        <div>
            <label className='labelLogin' htmlFor="password">Password</label>
            <input className='inputLoginPassword'
                placeholder='*********'
                type="password" 
                id='password' 
                name='password' 
                value={formState.password} 
                onChange={handleChangeInput}
            />
        </div>
        {responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
        {
            responseApiState.loading
            ? <span>Cargando</span>
            : <button className='botonLogin'>Iniciar sesion</button>
        }
    </form>
    <div className='contenedorLinkLogin'>
        <Link to={'/reset-password'}>Olvidaste tu contraseña?</Link>
    </div>
    </div>
        </div>
       
  )
}

export default LoginScreen
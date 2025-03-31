import React from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { Link } from 'react-router-dom'
import '../Styles/Login_Register.css'
const ResetPassword = () => {

    const initialFormState = {
        email: '',
    }


    const {formState, handleChangeInput} = useForm(initialFormState)
    const {responseApiState, postRequest} = useApiRequest(ENVIROMENT.URL_API+ '/api/auth/reset-password')


    const handleSubmitForm = async (e) =>{
        e.preventDefault()
        await postRequest(formState)
    }
    return (
        <div className='contenedorPadreLogin'>
            <div className='contenedorLogin'>
                <div className='contenedorH1Login'>
                    <h1 className='h1Login'>Recupera tu contraseña</h1>
                </div>
                <form className='formLogin' onSubmit={handleSubmitForm}>
                    <div className='form-group'>
                        <label className='labelLogin' htmlFor='email'>Email con el que se registró</label>
                        <input className='inputLogin'
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    {responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
                    {
                        responseApiState.loading
                        ? <span>Cargando...</span>
                        : (
                            responseApiState.data
                            ? <span>Se envió un correo con las instrucciones para recuperar tu contraseña</span>
                            : <button className='botonLogin'>Restablecer contraseña</button>
                        )
                    }
                </form>
                <div className='contenedorLinkLogin'>
                    <span>¿Ya tienes una cuenta? <Link to={'/login'}>Inicia sesión</Link></span>
                </div>
                <div className='contenedorLinkLogin'>
                    <span>¿Aún no tienes cuenta? <Link to={'/register'}>Regístrate</Link></span>
                </div>
            </div>
        </div>
    );
};


export default ResetPassword
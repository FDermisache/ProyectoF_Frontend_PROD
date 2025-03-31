import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import ENVIROMENT from '../config/enviroment'
import { useApiRequest } from '../hooks/useApiRequest'
import '../Styles/Login_Register.css'

const RegisterScreen = () => {
    const formInitialState = {
        username : "",
        email : "",
        password : "",
        profile_image_base64 : ""
    }

    const {formState, handleChangeInput} = useForm(formInitialState)
    const {responseApiState, postRequest} = useApiRequest(ENVIROMENT.URL_API + '/api/auth/register')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await postRequest(formState)
    }

    useEffect(() => {
        if (responseApiState.data) {
            setMessage('Tu registro fue exitoso! Revisa tu correo para verificar tu cuenta.');
        }
    }, [responseApiState.data]);

    return (
        <div className='contenedorPadreLogin'>
            <div className='contenedorLogin'>
                <div className='contenedorH1Login'>
                    <h1 className='h1Login'>Registrate en nuestra app</h1>
                </div>
                <form className='formLogin' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='labelLogin' htmlFor='username'>Nombre de usuario</label>
                        <input className='inputLogin'
                            placeholder='Robert'
                            type='text'
                            id='username'
                            name='username'
                            value={formState.username}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label className='labelLogin' htmlFor='email'>Email</label>
                        <input className='inputLogin'
                            placeholder='usuario@gmail.com'
                            type='email'
                            id='email'
                            name='email'
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label className='labelLogin' htmlFor='password'>Contraseña</label>
                        <input className='inputLoginPassword'
                            placeholder='Example_password123'
                            type='password'
                            id='password'
                            name='password'
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
                    {responseApiState.loading ? (
                        <span>Cargando</span>
                    ) : (
                        <button className='botonLogin' type='submit'>Registrar</button>
                    )}
                </form>
                {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            </div>
        </div>
    )
}

export default RegisterScreen

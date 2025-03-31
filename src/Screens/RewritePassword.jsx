import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import '../Styles/Login_Register.css'

const RewritePassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const resetToken = searchParams.get('reset_token')


    useEffect(
        ()=>{
            if(!resetToken){
                navigate('/')
            }
        },
        []
    )
    const initialFormState = {
        password: ''
    }

    const {formState, handleChangeInput}= useForm(initialFormState)
    const {responseApiState, putRequest} = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password')

    useEffect(()=>{
        if(responseApiState.data){
            navigate('/login')
        }
    }, 
    [responseApiState.data]
)

const handleSubmitForm = async (e)=>{
    e.preventDefault()
        await putRequest({password: formState.password, resetToken})
    
}
    
return (
    <div className='contenedorPadreLogin'>
        <div className='contenedorLogin'>
            <div className='contenedorH1Login'>
                <h1 className='h1Login'>Establecer nueva contraseña</h1>
            </div>
            <form className='formLogin' onSubmit={handleSubmitForm}>
                <div className='form-group'>
                    <label className='labelLogin' htmlFor='password'>Nueva contraseña</label>
                    <input 
                        className='inputLogin'
                        type="password" 
                        id='password' 
                        name='password' 
                        placeholder='NuevaContraseña' 
                        value={formState.password} 
                        onChange={handleChangeInput} 
                    />
                </div>

                {responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
                {
                    responseApiState.loading
                    ? <span>Cargando...</span>
                    : (
                        responseApiState.data 
                        ? <span>Enviado</span>
                        : <button className='botonLogin'>Establecer nueva contraseña</button>
                    )
                }
            </form>
        </div>
    </div>
)

}


export default RewritePassword
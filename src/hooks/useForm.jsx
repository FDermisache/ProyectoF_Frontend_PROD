import React, { useState } from 'react'

export const useForm = (formInitialState) => {
    //Manejamos el estado del formulario, el cual se inicializa con el estado inicial que le pasamos como parametro
const [formState, setFormState] = useState(formInitialState)

const handleChangeInput = (e) => {
    // extraemos las propiedad name y value del formulario
    const {name, value} = e.target

    const file_value = e.target?.files 
    if(file_value && file_value[0] instanceof File){
        const file = file_value[0]
        const reader = new FileReader()
        reader.onload = () =>{
            setFormState(
                (prevFormState) => {
                    return { ...prevFormState, [name]: reader.result}
                }
            )
        }
        reader.readAsDataURL(file)
        return
    }
    else{
        setFormState(
            (prevFormState) => {
                return { ...prevFormState, [name]: value }
            }
        )
    }
}
return {formState, handleChangeInput}
}
import { useContext, useState } from "react"
import { ServerError } from "../utils/error.utils"
import { AuthContext } from "../Context/auth.context";

 
export const useApiRequest = (url) => {
    const { AuthenticattionState } = useContext(AuthContext); // Obtiene el estado de autenticación
    const token = sessionStorage.getItem("authorization_token"); // Obtiene el token del sessionStorage


    const initialResponseApiState={
        loading: false,
        error: null,
        data: null
    }

    const [responseApiState, setResponseApiState] = useState(initialResponseApiState)

    const postRequest = async (body) => {
        try{
            setResponseApiState({...initialResponseApiState, loading: true})
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers:{
                        "Content-type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : "",
                    },
                    body: JSON.stringify(body)
                }
            )
            const data = await response.json()
            if(data.ok){
                setResponseApiState((prevState)=>{
                    return{...prevState, data: data}
                })
            }
            else{
                throw new ServerError(data.message, data.status)
            }
                    }
                    catch(error){
                        setResponseApiState((prevState)=>{
                            if(error.status){
                                return {...prevState, error: error.message}
                            }
                            return {...prevState, error: 'Error de conexión'}
                            }
                        )}
                        finally{
                            setResponseApiState((prevState)=>{
                                return {...prevState, loading: false}
                            })
                        }
                    }

const putRequest = async (body) => {
    try{
        setResponseApiState({...initialResponseApiState, loading: true})
        const response = await fetch (
            url,
            {
                method: 'PUT',
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )
        const data = await response.json()
        if(data.ok){
            setResponseApiState((prevState)=>{
                return {...prevState, data: data}
            })
        }
        else{
            throw new ServerError(data.message, data.status)
        }
        }
        catch(error){
            setResponseApiState((prevState)=>{
                if(error.status){
                    return {...prevState, error: error.message}
                }
                return {...prevState, error: 'Error de conexión'}
                }
            )}
            finally{
                setResponseApiState((prevState)=>{
                    return {...prevState, loading: false}
                })
        }
    }
    const getRequest = async () => {
        try {
          setResponseApiState({ ...initialResponseApiState, loading: true });
      
          const token = sessionStorage.getItem("authorization_token"); // O donde tengas almacenado el token
      
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': token ? `Bearer ${token}` : '', // Si hay token, lo incluye
              'Content-Type': 'application/json'
            },
          });
      
          const data = await response.json();
          console.log("Datos de la respuesta de la API:", data); // Verifica los datos que recibes aquí
      
          if (data.ok) {
            setResponseApiState((prevState) => ({
              ...prevState, data: data
            }));
            return data; // Asegúrate de que se retorna el data
          } else {
            throw new ServerError(data.message, data.status);
          }
        } catch (error) {
          console.error("Error en getRequest:", error);
          setResponseApiState((prevState) => {
            if (error.status) {
              return { ...prevState, error: error.message };
            }
            return { ...prevState, error: 'No se pudo obtener la información del servidor' };
          });
        } finally {
          setResponseApiState((prevState) => ({
            ...prevState, loading: false
          }));
        }
      };
      
      return { responseApiState, postRequest, putRequest, getRequest };
    }      

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../Styles/canalesStyles.css";
import Mensajes from "../Mensajes/Mensajes";
import NewEspacio from "../Espacios/NewEspacio";
import { useApiRequest } from "../hooks/useApiRequest";
import ENVIROMENT from "../config/enviroment";

const CanalesFind = () => {
  const { canal_id, titulo } = useParams();
  const [canal, setCanal] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const navigate = useNavigate();

  const { responseApiState, getRequest, postRequest } = useApiRequest(
    ENVIROMENT.URL_API + `/api/channel/${canal_id}/message`
  );

  useEffect(() => {
    if (canal_id) {
      setCanal({ id: canal_id, nombre: `Canal ${titulo}` });
    }
  }, [canal_id]);

  useEffect(() => {
    if (!canal) return;
    if (!titulo) {
      navigate(`/canales/${canal_id}/general`);
    }
  }, [canal, canal_id, titulo, navigate]);

  // Fetch de los mensajes al entrar al canal
  useEffect(() => {
    if (!canal_id) return;
  
    const fetchMessages = async () => {
      try {
        const data = await getRequest();
        console.log("Datos de la respuesta de la API:", data); // Asegúrate de ver lo que llega
  
        if (data && data.data && data.data.messages) {
          setMensajes(data.data.messages);
        } else {
          console.error("No se encontraron mensajes en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    };
  
    // Llamada inicial a la API para obtener los mensajes
    fetchMessages();
  
    // Intervalo para obtener los mensajes cada 5 segundos
    const interval = setInterval(() => {
      fetchMessages();  // Llamada a la API cada 5 segundos
    }, 1000);
  
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [canal_id]);
  
  

  // Enviar un nuevo mensaje
  const handleSendMessage = async (nuevoMensaje) => {
    if (!nuevoMensaje.trim()) return;

    try {
      // Enviar el mensaje con un POST
      const response = await postRequest({ content: nuevoMensaje });
      if (response?.data?.new_message) {
        // Actualizamos el estado de mensajes agregando el nuevo mensaje al principio o al final
        setMensajes((prevMensajes) => [...prevMensajes, response.data.new_message]);
        setNuevoMensaje("");  // Limpiamos el campo del nuevo mensaje
      }
    } catch (error) {
      console.error("Error al enviar mensaje", error);
    }
  };

  return (
    <div className="contenedorGeneral">
      <div className="contenedorHeader">
        <header>
          <span><i className="bi bi-arrow-left"></i></span>
          <span><i className="bi bi-arrow-right"></i></span>
          <label htmlFor="buscar"><i className="bi bi-search"></i></label>
          <input
            type="text"
            id="buscar"
            name="buscar"
            placeholder="Buscar en"
          />
          <div className="contenedorAyuda">
            <i className="bi bi-question-circle"></i>
          </div>
        </header>
      </div>
      <div className="contenedorCanales">
        <div className="contenedorListaCanales">
          <div className="contenedorTitulo">
            <h1 className="tituloDelCanal">{canal ? canal.nombre : "Canal no encontrado"}</h1>
          </div>
          <div className="prueba">
            <span className="subtitulo"><i className="bi bi-caret-down-fill"></i>Canales</span>
            <NewEspacio />
          </div>
        </div>
        <div className="contenedorChat">
          <div className="contenedorMensajes">
            <Mensajes
              mensajes={mensajes}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanalesFind;

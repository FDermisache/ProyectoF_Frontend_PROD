import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiRequest } from '../hooks/useApiRequest';
import ENVIROMENT from '../config/enviroment';
import '../Styles/stylesWorkspaces.css'
const WorkspacesItem = ({ title, miembros, id }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + `/api/channel/${id}`); // Aquí pasa el workspace_id
  const [channelCreated, setChannelCreated] = useState(false);

  const handleIniciarSlack = async () => {
    setIsLoading(true);

    try {
        // Intentar obtener el canal existente
        const getChannelResponse = await fetch(`${ENVIROMENT.URL_API}/api/channel/workspace/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });

        if (getChannelResponse.ok) {
            const channelData = await getChannelResponse.json();
            navigate(`/canales/${channelData.data._id}/general`);
            return;
        }

        // Si el canal no existe (404), entonces lo creamos
        const body = { name: "general" };
        const createChannelResponse = await postRequest(body);

        if (createChannelResponse.data) {
            const canalId = createChannelResponse.data.data.newChannel._id;
            navigate(`/canales/${canalId}/general`);
        }
    } catch (error) {
        console.error("Error al obtener o crear el canal:", error);
    } finally {
        setIsLoading(false);
    }
};

  
  

  return (
    <div className='ContenedorPrincipalItem'>
      <div className='ContenedorWorkspaceItem'>
        <div className='avatarWork'>
          <img className='avatar' src='/avatar_slack.png' alt="avatar workspaces" />
        </div>
        <div className='ContenedorTituloWorkspace'>
          <h2 className='tituloWorkspace'>{title}</h2>
          <div>
            <span className='miembros'>{miembros} miembros</span>
          </div>
        </div>
        <div className='contenedorBoton'>
          {/* Usamos el botón para crear el canal */}
          <button className='botonIniciar' onClick={handleIniciarSlack} disabled={isLoading || channelCreated}>
            {isLoading ? 'Creando canal...' : 'Iniciar Slack'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspacesItem;

import React, { useEffect, useState } from 'react'
import WorkspacesItem from './WorkspacesItem'
import ENVIROMENT from '../config/enviroment';

const WorkspacesList = () => {
    const [workspaces, setWorkspaces] = useState([]); // Inicializamos como un array vacío
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    
    // Usamos useEffect para obtener los workspaces del backend al montar el componente
    useEffect(() => {
      const fetchWorkspaces = async () => {
        try {
          const response = await fetch(ENVIROMENT.URL_API + '/api/workspace/my-workspaces', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,  // Incluir el token
            },
          });

          if (response.ok) {
            const data = await response.json();
            
            setWorkspaces(Array.isArray(data.data) ? data.data : []);
          } else {
            console.error('Error al obtener los workspaces:', response.statusText);
            setWorkspaces([]); // Si la respuesta no es válida, inicializamos workspaces como un array vacío
          }
        } catch (error) {
          console.error('Error al obtener los workspaces:', error);
          setWorkspaces([]); // Si hay un error en la llamada a la API, inicializamos workspaces como un array vacío
        }
      };
  
      fetchWorkspaces();
    }, [token]); // Solo se ejecuta una vez al montar el componente

    let workspacesListJSX = workspaces.map((workspace) => {
        return (
          <WorkspacesItem
            key={workspace._id}  // Usamos _id de MongoDB como key
            title={workspace.name}  // Asegúrate de que 'name' es el nombre del workspace
            id={workspace._id}  // ID del workspace
            miembros={workspace.members.length}  // Número de miembros
            img="/avatar_slack.png"  // Puedes cambiar la URL de la imagen
          />
        );
      });

    return (
        <div className='ContenedorForm'>
            <div className='title'>
            <div className='ContenedorImagenMano'>
            <img  className='imgSaludo' src="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand.gif" alt="mano saludando" />
            </div>
            <h1>¡Hola de nuevo!</h1>
            </div>
            <div className='ContMailUsu'>
                <span className='TextMail'>Espacio de trabajo para usuario@gmail.com</span>
            </div>
            <div>
                {workspacesListJSX}
            </div>
            <div className='ContenedorVerMas'>
                <span className='Vermas'>Ver mas <i className="bi bi-chevron-compact-down"></i> </span>
            </div>
            <div className='ContenedorSpan'>
                <span className='TextSpan'>¿No encuentras tu espacio de trabajo? <span className='TextSpanEspecial'>Prueba con otro correo electrónico <i className="bi bi-arrow-right"></i> </span></span>
            </div>
        </div>
    )
}

export default WorkspacesList;

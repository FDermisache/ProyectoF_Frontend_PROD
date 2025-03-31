import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import WorkspacesList from '../Workspaces/WorkspacesList';
import { WorkspacesContext } from '../Contextos/contextos';
import '../Styles/stylesCanales.css';

const WorkspacesHome = () => {
  const { workspaces, createWorkspace } = useContext(WorkspacesContext); // Consumir contexto
  const [showForm, setShowForm] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  // Envío del formulario
  const handleAddWorkspace = (e) => {
    e.preventDefault();
    createWorkspace(newWorkspaceName); // Llamar a la función del contexto
    setNewWorkspaceName(''); // Limpiar el input
    setShowForm(false); // Cerrar el formulario
  };
  
  return (
    <div className='ContenedorPadre'>
      {/* Botón para abrir el formulario */}
      <header className='header'>
        <div className='ContenedorImagenSlack'>
          <img
            className='imgSlack'
            src="https://a.slack-edge.com/3d92b39/marketing/img/nav/slack-salesforce-logo-nav-white.png"
            alt="Imagen Slack"
          />
        </div>
        <div className='ContenedorNav'>
          <nav>
            <span className='NavBar1'>Funciones <i className="bi bi-chevron-compact-down"></i></span>
            <span className='NavBar1'>Soluciones <i className="bi bi-chevron-compact-down"></i></span>
            <span className='NavBar1'>Empresa</span>
            <span className='NavBar1'>Recursos <i className="bi bi-chevron-compact-down"></i></span>
            <span className='NavBar1'>Precios</span>
          </nav>
        </div>
        <div className='ContenedorBotonVentas'>
          <button className='botonVentas'>HABLAR CON VENTAS</button>
        </div>
        <div>
        <Link to={'/NewWorkspaces'}><button className='botonNew'>CREAR UN NUEVO ESPACIO DE TRABAJO</button></Link>
        </div>
      </header>

      <WorkspacesList  />
    </div>
  );
};

export default WorkspacesHome;

import React, { createContext, useState, useEffect } from "react";

const WorkspacesContext = createContext();

const WorkspacesProvider = ({ children }) => {
  const initialWorkspaces = JSON.parse(localStorage.getItem("workspaces")) || [
    {
      imagen: '.',
      title: 'Trabajo Final',
      miembros: [],
      id: 1,
      messages: [],
    },
    {
      imagen: 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0023-88.png',
      title: 'Espacio de trabajo',
      miembros: [],
      id: 2,
      messages: [],
    },
    {
      imagen: 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0023-88.png',
      title: 'Google',
      miembros: [],
      id: 3,
      messages: [],
    },
  ];

  const [workspaces, setWorkspaces] = useState(initialWorkspaces);

  // Función para crear un nuevo workspace
  const createWorkspace = (newWorkspaceName) => {
    const newWorkspace = {
      id: workspaces.length + 1, 
      title: newWorkspaceName,
      miembros: [],
      imagen: '',
      mensajes: [
        {
          id: 103,
          titulo: '#general',
          mensajes: [],
        },
      ],
    };

    // Actualizar el estado y guardar en localStorage
    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    localStorage.setItem("workspaces", JSON.stringify(updatedWorkspaces));
  };

  

  return (
    <WorkspacesContext.Provider value={{ workspaces, createWorkspace }}>
      {children}
    </WorkspacesContext.Provider>
  );
};

export { WorkspacesProvider, WorkspacesContext };

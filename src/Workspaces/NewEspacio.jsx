/* import React, { useState, useContext } from 'react';
import { WorkspaceContext } from '../Contextos/contextos.jsx';

const NewEspacio = () => {
  const { workspace, setWorkspaces } = useContext(WorkspaceContext);
  const [showForm, setShowForm] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const handleAddWorkspace = (e) => {
    e.preventDefault();

    const nuevoCanal = {
      id: workspace.length + 1,
      title: newWorkspaceName,
      miembros: [],
      imagen: '',
    };

    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, nuevoCanal]);
    setNewWorkspaceName('');
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Agregar Espacio de Trabajo'}
      </button>
      <div className={showForm ? 'form-visible' : 'form-hidden'}>
        {showForm && (
          <form onSubmit={handleAddWorkspace}>
            <label>
              <div className="ContenedorEspacio">
                <span className="TextEspacio">Nombre del Canal: </span>
              </div>
              <div className="ContenedorInput">
                <input
                  className="input"
                  type="text"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  placeholder="Ingresa el nombre"
                />
              </div>
            </label>
            <div className="ContenedorBotonAgregar">
              <button className="botonAgregar" type="submit">
                Agregar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewEspacio;
 */


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewEspacio = ({ storageKey }) => {
  const [workspaces, setWorkspaces] = useState(() => {
    // Leer los espacios guardados para la clave específica
    const savedWorkspaces = localStorage.getItem(storageKey);
    return savedWorkspaces ? JSON.parse(savedWorkspaces) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const handleAddWorkspace = (e) => {
    e.preventDefault();
    const newWorkspace = {
      id: workspaces.length + 1,
      title: newWorkspaceName,
      miembros: [],
      imagen: '',
    };

    // Agregar el nuevo espacio y guardar en localStorage
    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    localStorage.setItem(storageKey, JSON.stringify(updatedWorkspaces));

    // Limpiar el formulario
    setNewWorkspaceName('');
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Crear Nuevo Espacio'}
      </button>
      {showForm && (
        <form onSubmit={handleAddWorkspace}>
          <label>
            <span>Nombre del Espacio:</span>
            <input
              type="text"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              placeholder="Ingresa el nombre"
            />
          </label>
          <button type="submit">Agregar</button>
        </form>
      )}
      <div>
        <h3>Espacios creados:</h3>
        <ul>
          {workspaces.map((workspace) => (
            <Link key={workspace.id} >{workspace.title} </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewEspacio;
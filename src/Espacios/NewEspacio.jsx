import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Necesitamos Link para la navegación

const NewEspacio = () => {
  const [newWorkspace, setNewWorkspace] = useState([]);

  const HandelSubmitForm = (e) => {
    e.preventDefault();
    const canalJSX = e.target;
    const nombreCanal = canalJSX.texto.value;

    const newCanal = {
      id: newWorkspace.length + 1, // Genera un ID basado en la longitud del array
      title: nombreCanal,
      miembros: [],
      mensajes: [
        {
          nombre: 'Admin',
          img: '',
          hora: '11:00',
          mensaje: 'Bienvenido al nuevo canal',
          id: 1,
        },
      ],
    };

    setNewWorkspace([...newWorkspace, newCanal]);
    canalJSX.reset(); // Resetea el formulario
  };

  return (
    <div>
      <form onSubmit={HandelSubmitForm}>
        <label htmlFor="texto"></label>
        <input type="text" id="texto" name="texto" placeholder="Nombre del canal" />
        <button type="submit">Crear canal</button>
      </form>

      <div>
        {newWorkspace.map((canal) => (
          <div key={canal.id}>
            {/* Link para cambiar la URL al canal seleccionado */}
            <Link to={`/canales/${canal.id}/nuevoEspacio`}>
              <span>{' # ' + canal.title}</span>
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewEspacio;

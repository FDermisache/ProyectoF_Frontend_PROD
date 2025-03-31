import React, { useEffect, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { useWorkspaceForm } from "../hooks/useWorkspacesForm";
import ENVIROMENT from "../config/enviroment";
import { useNavigate } from "react-router-dom";
import '../Styles/newWorkspaces.css'

const NewWorkspaces = () => {
  const { formState, handleChangeInput, addTeamMember } = useWorkspaceForm();
  const { responseApiState, postRequest } = useApiRequest(
    ENVIROMENT.URL_API + "/api/workspace"
  );
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const data = {
      name: formState.name,
      profilePicture: formState.profilePicture,
      teamMembers: formState.teamMembers,
      activity: formState.activity,
    };

    await postRequest(data);

    if (responseApiState.data) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    addTeamMember(formState.email);
    setCurrentStep(currentStep + 1);
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    console.log("Actividad añadida:", formState.activity);
    setCurrentStep(currentStep + 1);
  };
  
  useEffect(() => {
    if (responseApiState.data && currentStep === 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [responseApiState.data, currentStep]);

  useEffect(()=>{
    if(currentStep === 4){
        navigate('/workspaces')
    }
  },[currentStep, navigate])

  return (
    <div className="contenedorPrincipal">
      <div className="contenedorContenido">
        {currentStep === 1 && (
          <div className="ContenedorPaso1">
            <div className="ContenedorPaso">
            <span className="paso">Paso 1 de 5</span>
            </div>
            <div className="ContenedorTitulo">
            <h1 className="titulo">¿Cómo te llamas?</h1>
            </div>
            <div className="ContenedorParrafo">
            <p className="parrafo">
              Agregar tu nombre y foto de perfil ayuda a que tus compañeros de
              equipo te reconozcan y puedan conectarse contigo más fácilmente.
            </p>
            </div>

            <div className="ContenedorForm1">
              <form className='formLogin' onSubmit={handleSubmitForm}>
                <div>
                  <label className='labelLogin'>Nombre</label>
                  <input className='inputLogin'
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={formState.name}
                    onChange={handleChangeInput}
                  />
                </div>
                <button className='botonLogin' type="submit">Siguiente</button>
              </form>
            </div>
          </div>
        )}

{currentStep === 2 && (
  <div className="ContenedorPaso1">
    <div className="ContenedorPaso">
      <span className="paso">Paso 2 de 5</span>
    </div>
    <div className="ContenedorTitulo">
      <h2 className="titulo">¿Quién más está en el equipo?</h2>
    </div>
    <div className="ContenedorParrafo">
      <span className="parrafo">Agregar compañero por correo electrónico</span>
    </div>
    <div className="ContenedorForm1">
      <form className="formLogin" onSubmit={handleAddMember}>
        <div>
          <input
            className="inputLogin"
            type="email"
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <button className="botonLogin" type="submit">Agregar</button>
        </div>
      </form>
    </div>
  </div>
)}

{currentStep === 3 && (
  <div className="ContenedorPaso1">
    <div className="ContenedorPaso">
      <span className="paso">Paso 3 de 5</span>
    </div>
    <div className="ContenedorTitulo">
      <h2 className="titulo">¿En qué está trabajando tu equipo en este momento?</h2>
    </div>
    <div className="ContenedorParrafo">
      <span className="parrafo">
        Puede ser cualquier cosa: un proyecto, una campaña, un evento o el acuerdo que intentas cerrar.
      </span>
    </div>
    <div className="ContenedorForm1">
      <form className="formLogin" onSubmit={handleAddActivity}>
        <div>
          <input
            className="inputLogin"
            type="text"
            name="activity"
            placeholder="Nombre de la actividad"
            value={formState.activity}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <button className="botonLogin" type="submit">Agregar</button>
        </div>
      </form>
    </div>
  </div>
)}

{currentStep === 4 && (
  <div className="ContenedorPaso1">
    <div className="ContenedorPaso">
      <span className="paso">Paso 4 de 5</span>
    </div>
    <div className="ContenedorTitulo">
      <h3 className="titulo">¡Tu espacio de trabajo está listo!</h3>
    </div>
  </div>
)}

        
      </div>

    </div>
      
  );
};

export default NewWorkspaces;

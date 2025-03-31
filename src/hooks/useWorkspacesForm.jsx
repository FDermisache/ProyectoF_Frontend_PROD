import { useState } from "react";


export const useWorkspaceForm = () => {
    const initialState = {
      name: "",              // Nombre del workspace
      profilePicture: "",    // Foto de perfil
      email: "",             // Email del compañero de equipo
      teamMembers: [],       // Lista de compañeros
      activity: "",          // Actividad del equipo
    };
  
    const [formState, setFormState] = useState(initialState);
  
    const handleChangeInput = (event) => {
      const { name, value } = event.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const addTeamMember = (email) => {
      setFormState((prevState) => ({
        ...prevState,
        teamMembers: [...prevState.teamMembers, email],
        email: "",
      }));
    };
  
    return {
      formState,
      handleChangeInput,
      addTeamMember,
    };
  };
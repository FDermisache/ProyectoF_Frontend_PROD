import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CanalesFind from './Canales/CanalesFind';
import CanalesRender from './Canales/CanalesRender';

import ProtectedRoute from './Components/Protected.Route';
import WorkspacesHome from './Screens/WorkspacesHome';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ResetPassword from './Screens/ResetPassword';
import RewritePassword from './Screens/RewritePassword';
import NewWorkspaces from './Screens/NewWorkspaces';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                
                <Route element={<ProtectedRoute />}>
                <Route path="/workspaces" element={<WorkspacesHome />} />
                </Route>

                
                <Route path="/canales/:canal_id/:titulo" element={<CanalesFind />} /> 
                <Route path="/canales/:canal_id" element={<CanalesFind />} />



                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route element={<ProtectedRoute />}>
                <Route path="/rewrite-password" element={<RewritePassword />} />
                </Route>


                <Route element={<ProtectedRoute />}>
                <Route path="/NewWorkspaces" element={<NewWorkspaces/>} />
                </Route>
                
                
            </Routes>
        </div>
    );
}

export default App;

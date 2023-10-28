import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function PrivateRoute() {
    let {login} = useContext(AuthContext);
    return login ? <Outlet /> : <Navigate to="/home" /> 
}

export default PrivateRoute
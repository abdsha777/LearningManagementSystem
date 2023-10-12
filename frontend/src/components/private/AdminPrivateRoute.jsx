import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function AdminPrivateRoute() {
    let {role} = useContext(AuthContext);
    return role=='admin' ? <Outlet /> : <Navigate to="/" /> 
}

export default AdminPrivateRoute
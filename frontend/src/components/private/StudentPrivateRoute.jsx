import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function StudentPrivateRoute() {
    let {role} = useContext(AuthContext);
    return role=='student' ? <Outlet /> : <Navigate to="/" /> 
}

export default StudentPrivateRoute
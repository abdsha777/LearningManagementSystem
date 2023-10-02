import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function TeacherPrivateRoute() {
    let {role} = useContext(AuthContext);
    return role=='teacher' ? <Outlet /> : <Navigate to="/" /> 
}

export default TeacherPrivateRoute
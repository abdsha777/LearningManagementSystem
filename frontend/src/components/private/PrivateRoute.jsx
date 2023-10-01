import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    // let {userlogi} = useContext(AuthContext)
    let login = true;
    return login ? <Outlet /> : <Navigate to="/login" /> 
}

export default PrivateRoute
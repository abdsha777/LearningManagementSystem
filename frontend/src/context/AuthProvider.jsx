import React, { useState } from 'react'
import AuthContext from './AuthContext'
import {useNavigate} from 'react-router-dom'

function AuthProvider({ children }) {
    const [login,setLogin]=useState(true);
    const [role,setRole] = useState("student");
    const nav = useNavigate();
    function loginUser(pass){
        setRole(pass)
        setLogin(true);
        nav('/')
    }
    const contextData = {
        loginUser:loginUser,
        name: "Veena Ghandi",
        role:role,
        login:login,
    }
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
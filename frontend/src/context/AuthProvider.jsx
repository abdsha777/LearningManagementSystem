import React, { useState } from 'react'
import AuthContext from './AuthContext'
import {useNavigate} from 'react-router-dom'

function AuthProvider({ children }) {
    const [login,setLogin]=useState(false);
    const [role,setRole] = useState("");
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
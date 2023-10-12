import React, { useState } from 'react'
import AuthContext from './AuthContext'
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";

function AuthProvider({ children }) {
    const [login,setLogin]=useState(false);
    const [role,setRole] = useState("teacher");
    const nav = useNavigate();
    const [token,setToken] = useState(null)
    const [user,setUser] = useState(null)
    // const backend = "https://lms-fh7w.onrender.com";
    const backend = "http://localhost:5000";
    async function loginUser(email,password){
        try {
            const init={
                method: 'POST',
                body:JSON.stringify({
                    email:email,
                    password:password
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            var res = await fetch(`${backend}/api/auth/login`,init)
            if (!res.ok) {
                throw new Error('Login failed');
            }
            var data = await res.json();
            setToken(data)
            var decoded = await jwt_decode(data);
            console.log(decoded);
            setUser(decoded.user)
            setLogin(true)
            nav('/')
        } catch (error) {
            console.log(error)
        }
    }
    const contextData = {
        loginUser:loginUser,
        name: user==null?"User":user.name,
        role: user==null?"student":user.role,
        login: login,
    }
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
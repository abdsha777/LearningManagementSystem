import React, { useState } from 'react'
import AuthContext from './AuthContext'
import {useNavigate} from 'react-router-dom'

function AuthProvider({ children }) {
    const [login,setLogin]=useState(true);
    const [role,setRole] = useState("student");
    const nav = useNavigate();
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [user,setUser] = useState(null)

    if(user!=null){
        nav('/')
    }
    async function loginUser(email,password){
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
        fetch("http://localhost:5000/auth/login/",init)
        .then(res=>res.json())
        .then(data=>setToken(data))
        .catch(error=>console.log(error))
        
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
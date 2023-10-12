import React, { useContext, useState } from 'react'
import './Login.css'
import AuthContext from '../../context/AuthContext';

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {loginUser} = useContext(AuthContext);
    return (
        <div className="login">
            <div className="login-left">
                <div className="ll-header">
                    <div className="login-logo">
                    </div>
                    <div className="ll-heading">
                        AISC Learning Management System
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="ll-header-1">
                    <div className="logo-1">

                    </div>
                    <div className="ll-heading-1">
                        AISC Learning Management System
                    </div>
                </div>


                <div className="login-form">
                    <h1>LOGIN</h1>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Enter email..." 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password..."
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} 
                        />

                    </div>

                    <div className="lbtn-fp">
                        <button className="btn-filled-1"
                            onClick={()=>{
                                loginUser(email,password)
                            }}
                        >
                            LOGIN
                        </button>

                        <a href="">
                            <small>
                                Forget Password ?
                            </small>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
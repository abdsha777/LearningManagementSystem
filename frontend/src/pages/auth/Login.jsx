import React from 'react'
import './Login.css'

function Login() {
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
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="enter username" />

                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="enter password" />

                    </div>

                    <div className="lbtn-fp">
                        <button className="btn-filled-1">
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
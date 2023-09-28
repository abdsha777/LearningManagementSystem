import React from 'react'
import sir from '../../assets/sir.png'
import './navbar.css'

function Navbar() {
    return (
        <header>
            <nav>
                <div className="logo">
                    <div className="logo-img"></div>
                    <h2>LMS</h2>
                </div>
                <h1 className="greetings">Welcome Kamil Khan</h1>

                <div className="profile">
                    <img src={sir} alt="sir" />
                    <div className="profile-info">
                        <h2>Kamil Khan</h2>
                        <p>Teacher</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
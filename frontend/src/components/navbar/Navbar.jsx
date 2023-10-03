import React, { useContext } from 'react'
import sir from '../../assets/sir.png'
import './navbar.css'
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar({showMenu}) {
    let {name,role} = useContext(AuthContext);
    return (
        <header>
            <nav>
                <div className="menu" onClick={showMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="logo">
                    <div className="logo-img"></div>
                    <h2>LMS</h2>
                </div>
                <h1 className="greetings">Welcome {name}</h1>

                <div className="profile">
                    <Link to="/profile/">
                        <img src={sir} alt="sir" />
                    </Link>
                    <div className="profile-info">
                        <h2>{name}</h2>
                        <p>{role}</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
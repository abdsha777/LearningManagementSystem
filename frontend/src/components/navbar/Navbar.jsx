import React, { useContext } from 'react'
import sir from '../../assets/user.jpg'
import './navbar.css'
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar({showMenu}) {
    let {name,role} = useContext(AuthContext);
    name =  name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <header>
            <nav className='shadow'>
                <div className="menu" onClick={showMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="logo">
                    {/* <div className="logo-img"></div> */}
                    <h4>LMS</h4>
                </div>
                <p className="greetings">Welcome {name}</p>

                <div className="profile">
                    <Link to="/profile/">
                        <img src={sir} alt="sir" />
                    </Link>
                    <div className="profile-info">
                        <p>{name}</p>
                        <p>{role}</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
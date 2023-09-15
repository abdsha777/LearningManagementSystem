import React from 'react'

function Navbar() {
    return (
        <header>
            <nav>
                <div class="logo">
                    <div class="logo-img"></div>
                    <h2>LMS</h2>
                </div>
                <h1 class="greetings">Welcome Kamil Khan</h1>

                <div class="profile">
                    <img src='../assets/sir.png' alt="sir" />
                    <div class="profile-info">
                        <h2>Kamil Khan</h2>
                        <p>Teacher</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
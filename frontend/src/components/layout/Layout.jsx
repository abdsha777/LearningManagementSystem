import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Menu from '../menu/Menu'
import Sidebar from '../sidebar/Sidebar'
function Layout() {
    const [menu, setMenu] = useState('')
    function showMenu() {
        setMenu(menu == "active" ? "" : "active")
    }
    return (
        <>
            <Navbar showMenu={showMenu} />
            <main>
                <Menu menu={menu} showMenu={showMenu} />
                <div className="sidebar-container shadow">
                    <Sidebar />
                </div>
                <div className="main-content">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Layout
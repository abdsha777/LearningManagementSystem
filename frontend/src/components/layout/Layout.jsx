import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Menu from '../menu/Menu'
function Layout() {
    const [menu,setMenu]=useState('')
    function showMenu(){
        setMenu(menu=="active"?"":"active")
    }
    return (
        <>
            <Navbar showMenu={showMenu} />
            <main>
                <Menu menu={menu}/>
                <Sidebar />
                <div className="main-content">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Layout
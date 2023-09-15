import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <>
        <Navbar />
        <main>
          <Sidebar />
          <div class="main-content">
            
          </div>
        </main>
        <Outlet />
    </>
  )
}

export default Layout
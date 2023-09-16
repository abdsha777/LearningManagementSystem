import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
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
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
            <Outlet />
          </div>
        </main>
    </>
  )
}

export default Layout
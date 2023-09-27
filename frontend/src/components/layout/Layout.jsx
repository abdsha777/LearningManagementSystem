import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import TeacherCourseDetail from '../../pages/teacher/TeacherCourseDetail'
function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Sidebar />
        <div className="main-content">
          <TeacherCourseDetail />
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
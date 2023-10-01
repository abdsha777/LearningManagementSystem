import React from 'react'
import StudentSidebar from './StudentSidebar'
import TeacherSidebar from './TeacherSidebar'
import AdminSidebar from './AdminSidebar'

function Sidebar() {
    const role= 'student'
    if(role=='student'){
        return <StudentSidebar />
    }else if(role=='teacher'){
        return <TeacherSidebar />
    }else if(role=="admin"){
        return <AdminSidebar />
    }
}

export default Sidebar
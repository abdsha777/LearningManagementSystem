import React from 'react'
import StudentDashboard from '../../pages/student/StudentDashboard'
import TeacherDashboard from '../../pages/teacher/TeacherDashboard'
import AdminDashboard from '../../pages/admin/AdminDashboard'

function Dashboard() {
    const role= 'student'
    if(role=='student'){
        return <StudentDashboard />
    }else if(role=='teacher'){
        return <TeacherDashboard />
    }else if(role=="admin"){
        return <AdminDashboard />
    }
}

export default Dashboard
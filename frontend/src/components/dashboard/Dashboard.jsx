import React, { useContext } from 'react'
import StudentDashboard from '../../pages/student/StudentDashboard'
import TeacherDashboard from '../../pages/teacher/TeacherDashboard'
import AdminDashboard from '../../pages/admin/AdminDashboard'
import AuthContext from '../../context/AuthContext';

function Dashboard() {
    let {role} = useContext(AuthContext);
    
    if(role=='student'){
        return <StudentDashboard />
    }else if(role=='teacher'){
        return <TeacherDashboard />
    }else if(role=="admin"){
        return <AdminDashboard />
    }
}

export default Dashboard
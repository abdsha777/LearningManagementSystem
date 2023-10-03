import React, { useContext } from 'react'
import StudentSidebar from './StudentSidebar'
import TeacherSidebar from './TeacherSidebar'
import AdminSidebar from './AdminSidebar'
import AuthContext from '../../context/AuthContext';

function Sidebar() {
    let {role} = useContext(AuthContext);
    if(role=='student'){
        return <StudentSidebar />
    }else if(role=='teacher'){
        return <TeacherSidebar />
    }else if(role=="admin"){
        return <AdminSidebar />
    }
}

export default Sidebar
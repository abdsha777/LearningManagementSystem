import React from 'react'
import StudentMenu from './StudentMenu'
import TeacherMenu from './TeacherMenu'
import AdminMenu from './AdminMenu'

function Menu({ menu, showMenu }) {
    const role= 'student'
    if(role=='student'){
        return <StudentMenu menu={menu} showMenu={showMenu} />
    }else if(role=='teacher'){
        return <TeacherMenu menu={menu} showMenu={showMenu} />
    }else if(role=="admin"){
        return <AdminMenu menu={menu} showMenu={showMenu} />
    }
}

export default Menu
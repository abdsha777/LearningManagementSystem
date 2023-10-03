import React, { useContext } from 'react'
import StudentMenu from './StudentMenu'
import TeacherMenu from './TeacherMenu'
import AdminMenu from './AdminMenu'
import AuthContext from '../../context/AuthContext';

function Menu({ menu, showMenu }) {
    let {role} = useContext(AuthContext);
    if(role=='student'){
        return <StudentMenu menu={menu} showMenu={showMenu} />
    }else if(role=='teacher'){
        return <TeacherMenu menu={menu} showMenu={showMenu} />
    }else if(role=="admin"){
        return <AdminMenu menu={menu} showMenu={showMenu} />
    }
}

export default Menu
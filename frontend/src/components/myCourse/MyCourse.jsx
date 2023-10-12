import React, { useContext } from 'react'
import StudentMyCourse from '../../pages/student/StudentMyCourse';
import TeacherMyCourses from '../../pages/teacher/TeacherMyCourses';
import AuthContext from '../../context/AuthContext';

function MyCourse() {
    let {role} = useContext(AuthContext);
    
    if(role=='student'){
        return <StudentMyCourse />
    }else if(role=='teacher'){
        return <TeacherMyCourses />
    }
}

export default MyCourse
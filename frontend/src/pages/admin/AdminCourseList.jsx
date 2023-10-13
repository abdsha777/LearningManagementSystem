import React, { useEffect,useState } from 'react';
import './AdminCourseList.css';

function AdminCourseList() {
    const dbJson = "https://jsonserver-6gyk.onrender.com";
    const [courses, setCourses] = useState([])
    const getCourseList=()=>{
        fetch(`${dbJson}/Admin_course_list`)
        .then(response=>response.json())
        .then(data=>setCourses(data))
        .catch(e=>console.log(e))
    }

    useEffect(()=>{
        getCourseList();
    },[])
    return (
        <div className="main_module">
            <h1 className="list-heading">Course List</h1>

            <div className="sub_heading">
                <input type="text" placeholder="Search Courses" />

                <button className="filter1">Filter </button>
            </div>

            <div className="module2">
                <p className="heading1">Courses</p>
            </div>

            <div className="module5">
                <table>
                    <thead>
                        <tr>
                            <th>Course name</th>
                            <th>Teacher Name</th>
                            <th>Uploaded on</th>
                            <th>Total Enrollments</th>
                            <th>Total No of Students<br />Completed</th>
                            <th>Set<br />Visibility</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((record,key)=>{
                                return(
                                    <tr key={key}>
                            <td>
                                <div className="course-info">
                                    {record.course_name}
                                     </div>
                            </td>
                            <td>{record.teacher_name}</td>
                            <td>{record.uploaded_on}</td>
                            <td>{record.total_enrolment}</td>
                            <td>{record.total_student_completed}</td>
                            <td>
                                <button>Set</button>
                            </td>
                            <td>
                                <button>View</button>
                            </td>
                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminCourseList;

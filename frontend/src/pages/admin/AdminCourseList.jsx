import React, { useEffect,useState } from 'react';
import './AdminCourseList.css';
import StudentFilter from '../../components/popups/StudentFilter';

function AdminCourseList() {
    const dbJson = import.meta.env.VITE_BACKEND;
    const [courses, setCourses] = useState([])
    const getCourseList=()=>{
        fetch(`${dbJson}/Admin_course_list`)
        .then(response=>response.json())
        .then(data=>setCourses(data))
        .catch(e=>console.log(e))
        console.log(courses)
    }

    useEffect(()=>{
        getCourseList();
    },[])
    return (
        <div className="main_module">
            <h3 className="list-heading">Course List</h3>

            <div className="sub_heading">
                <input type="text" placeholder="Search Courses" />
                
                {/* <StudentFilter /> */}
                <button class="filterBtn">Filter</button>
            </div>

            
            <h4>Courses</h4>
            

            <div className="listTableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Course name</th>
                            <th>Teacher Name</th>
                            <th>Uploaded on</th>
                            <th>Total Enrollments</th>
                            <th>Total No of Students<br />Completed</th>
                            <th>Set<br />Visibility</th>
                            {/* <th>View</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((record,key)=>{
                                return(
                                    <tr key={key}>
                            <td>
                                <div className="course-info">
                                    {record.title}
                                     </div>
                            </td>
                            <td>{record.teacher}</td>
                            <td>{record.date}</td>
                            <td>{record.enrolledStudents}</td>
                            <td>{record.completedStudents}</td>
                            <td>
                                <button>Set</button>
                            </td>
                            {/* <td>
                                <button>View</button>
                            </td> */}
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

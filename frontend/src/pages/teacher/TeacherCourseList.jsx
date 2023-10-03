import React,{useState,useEffect} from 'react';
import './teachercourselist.css';

function TeacherCourseList() {
    const [course, setCourse] = useState([]);

    const getCourseList = () => {
        fetch(" http://localhost:7000/Admin_Teacher_course")
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => alert(error))
    }
    useEffect(() => {
        getCourseList();
    }, [])
    return (
        <div>
            <div className="head">
                <h1>My Course List</h1>
            </div>
            <div className="inputs">
                <input type="text" placeholder="Search courses" />
            </div>
            <div className="table-start">
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Uploaded On</th>
                            <th>Total Enrollments</th>
                            <th>Total Number of Students Completed</th>
                            <th>Set Visibility</th>
                            <th>Check Visibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            course.map((record,key) => {
                                return (
                                    <tr key={key}>
                                        <td className="flex">
                                            <h5>{record.name}</h5>
                                        </td>
                                        <td><h5>{record.upload}</h5></td>
                                        <td><h5>{record.enroll}</h5></td>
                                        <td><h5>{record.student_complete}</h5></td>
                                        <td><button>Set</button></td>
                                        <td><button>View</button></td>
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

export default TeacherCourseList;

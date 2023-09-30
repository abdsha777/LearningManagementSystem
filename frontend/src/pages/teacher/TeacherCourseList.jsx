import React from 'react';
import './teachercourselist.css';

function TeacherCourseList() {
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
                        <tr>
                            <td className="flex">
                                <h5>React Js</h5>
                            </td>
                            <td><h5>29 AUG 2023</h5></td>
                            <td><h5>50</h5></td>
                            <td><h5>20</h5></td>
                            <td><button>Set</button></td>
                            <td><button>View</button></td>
                        </tr>
                        <tr>
                            <td className="flex">
                                <h5>React Js</h5>
                            </td>
                            <td><h5>29 AUG 2023</h5></td>
                            <td><h5>50</h5></td>
                            <td><h5>20</h5></td>
                            <td><button>Set</button></td>
                            <td><button>View</button></td>
                        </tr>
                        <tr>
                            <td className="flex">
                                <h5>React Js</h5>
                            </td>
                            <td><h5>29 AUG 2023</h5></td>
                            <td><h5>50</h5></td>
                            <td><h5>20</h5></td>
                            <td><button>Set</button></td>
                            <td><button>View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default TeacherCourseList;

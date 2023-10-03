import React from 'react';
import './AdminCourseList.css';

function AdminCourseList() {
    
    return (
        <div className="main_module">
            <p className="heading">Course List</p>

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
                        <tr>
                            <td>
                                <div className="course-info">
                                    React JS
                                </div>
                            </td>
                            <td>Kamil Khan</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                            <td>
                                <button>Set</button>
                            </td>
                            <td>
                                <button>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="course-info">
                                    React JS
                                </div>
                            </td>
                            <td>Kamil Khan</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                            <td>
                                <button>Set</button>
                            </td>
                            <td>
                                <button>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="course-info">
                                    React JS
                                </div>
                            </td>
                            <td>Kamil Khan</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                            <td>
                                <button>Set</button>
                            </td>
                            <td>
                                <button>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="course-info">
                                    React JS
                                </div>
                            </td>
                            <td>Kamil Khan</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                            <td>
                                <button>Set</button>
                            </td>
                            <td>
                                <button>View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminCourseList;

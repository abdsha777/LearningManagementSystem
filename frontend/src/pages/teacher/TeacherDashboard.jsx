import React from 'react'
import './TeacherDashboard.css'
import img from '../../assets/FigmaGraph.jpg'
function TeacherDashboard() {
  return (
    <>
    <div className="main-content">
            <div className="Topcontent">
                <div className="Studentinfo">
                    <div className="student-head">

                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Student</h3>
                                <h4 id="num">500</h4>
                            </div>
                        </div>

                    </div>
                   
                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Course Uploaded</h3>
                                <h4 id="num">5</h4>
                            </div>
                        </div>
                    </div>

                   
                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Student Enrolled</h3>
                                <h4 id="num">1000</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="graph">
                    <img src={img} alt=""/>
                </div>
            </div>
            <div className="CourseTable">
                <h1>My Course</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Uploaded On</th>
                            <th>Total Enrollments</th>
                            <th>Total No. of Student Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>React JS</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>React JS</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>React JS</td>
                            <td>29-AUG-2023</td>
                            <td>50</td>
                            <td>20</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </>
  )
}

export default TeacherDashboard
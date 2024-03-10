import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AuthContext from '../../context/AuthContext';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AdminDashboard() {
    const backend = import.meta.env.VITE_BACKEND;
    
    const {token} = useContext(AuthContext);
    const [course, setCourse] = useState([])
    const [overView, setOverview] = useState([])
    const getOverviewList = () => {
        // fetch(`${backend}/api/overview/admin/`,{headers:{token:token}})
        fetch(`${backend}/Admin_overview`,{headers:{token:token}})
            .then(response => response.json())
            .then(data => setOverview(data))
            .catch(error => console.log(error))
            // console.log(overView)
    }
    const getCourseList = () => {
        // fetch(`${backend}/api/course/`,{headers:{token:token}})
        fetch(`${backend}/Admin_course_list`,{headers:{token:token}})
            .then(response => response.json())
            .then(data => setCourse(data))
            // .then(data => setCourse(data['courses']))
            .catch(error => console.log(error))
        // console.log(course)
    }

    useEffect(() => {
        getCourseList();
        getOverviewList();
    }, [])
    const data = {
        labels: ['react','Java','C++'],
        // labels: overView.courseData?.map(e=>e.courseName),
        datasets: [{
            label: 'No Of Sudents',
            // data: overView.courseData?.map(e=>e.studentCount),
            data: [22,33,100],
            backgroundColor: ['#d44950']
        }]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Students Enrolled'
            }
        },
        maintainAspectRatio: false
    }
    return (
        <div>
            <div className="Topcontent">
                <div className="Studentinfo admin">
                    <div className="student-head">

                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Student</h3>
                                <h4 id="num">{overView.totalStudents}11</h4>
                            </div>
                        </div>

                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Teachers</h3>
                                <h4 id="num">{overView.totalTeachers}22</h4>
                            </div>
                        </div>
                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Course Uploaded</h3>
                                <h4 id="num">{overView.totalCourses}122</h4>
                            </div>
                        </div>
                    </div>


                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Student Enrolled</h3>
                                <h4 id="num">{overView.totalEnrollments}22</h4>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="graph">
                    <Bar
                        options={options}
                        data={data}
                    />
                </div>
            </div>
            <div className="CourseTable">
                <h3>Courses</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Uploaded On</th>
                            <th>Total Enrollments</th>
                            <th>Total No. of Student Completed</th>
                            <th>Uploaded By</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>aa</td>
                            <td>aa</td>
                            <td>aa</td>
                            <td>aa</td>
                            <td>aa</td>
                        </tr>
                        {
                            course.map((record, key) => {
                                let date = new Date(record.date )
                                return (
                                    <tr key={key}>
                                        <td>{record.title}</td>
                                        {/* <td>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</td> */}
                                        <td>{record.date}</td>
                                        <td>{record.enrolledStudents}</td>
                                        <td>{record.completedStudents}</td>
                                        <td>{record.teacher}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard;
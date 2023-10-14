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
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const backend = "http://localhost:5000";
    const {token} = useContext(AuthContext);
    const [course, setCourse] = useState([])
    const [overView, setOverview] = useState([])
    const getCourseList = () => {
        fetch(`${backend}/api/overview/admin/`,{headers:{token:token}})
            .then(response => response.json())
            .then(data => setOverview(data))
            .catch(error => console.log(error))
    }
    const getOverviewList = () => {
        fetch(`${backend}/api/course/`,{headers:{token:token}})
            .then(response => response.json())
            .then(data => setCourse(data['courses']))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getCourseList();
        getOverviewList();
    }, [])
    const data = {
        labels: overView.courseData?.map(e=>e.courseName),
        datasets: [{
            label: 'No Of Sudents',
            data: overView.courseData?.map(e=>e.studentCount),
            backgroundColor: ['#5DDCD6']
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
                                <h4 id="num">{overView.totalStudents}</h4>
                            </div>
                        </div>

                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Teachers</h3>
                                <h4 id="num">{overView.totalTeachers}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Course Uploaded</h3>
                                <h4 id="num">{overView.totalCourses}</h4>
                            </div>
                        </div>
                    </div>


                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Student Enrolled</h3>
                                <h4 id="num">{overView.totalEnrollments}</h4>
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
                <h1>Courses</h1>
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
                        {
                            course.map((record, key) => {
                                let date = new Date(record.createdAt)
                                return (
                                    <tr key={key}>
                                        <td>{record.title}</td>
                                        <td>{`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}</td>
                                        <td>---</td>
                                        <td>---</td>
                                        <td>{record.teacherId}</td>
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
import React from 'react'
import './TeacherDashboard.css'
import img from '../../assets/FigmaGraph.jpg'
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function TeacherDashboard() {
    const data = {
        labels: ['React', 'Java', 'C++', "Python", 'React', 'Java', 'C++', "Python"],
        datasets: [{
            label: 'No Of Sudents',
            data: [121, 222, 88, 200, 121, 222, 88, 200],
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
                    <Bar
                        options={options}
                        data={data}
                    />
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
    )
}

export default TeacherDashboard
import React,{useState,useEffect} from 'react'
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
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const dbJson = "http://localhost:7000";
    const [course,setCourse]=useState([]);
    const [overview,setOverview]=useState([]);

    const getCourseList=()=>{
        fetch(`${dbJson}/Admin_Teacher_course`)
        .then(response=>response.json())
        .then(data=>setCourse(data))
        .catch(error=>console.log(error))
    }
    const getOverview=()=>{
        fetch(`${dbJson}/Teacher_overview`)
        .then(response=>response.json())
        .then(data=>setOverview(data[0]))
        .catch(error=>console.log(error))
    }
    useEffect(()=>{
        getCourseList();
        getOverview();
    },[])
    const data = {
        labels: ['React', 'Java', 'C++', "Python", 'React', 'Java', 'C++', "Python"],
        datasets: [{
            label: 'No Of Sudents',
            data: [121, 222, 88, 200, 121, 222, 88, 200],
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
                <div className="Studentinfo">
                    <div className="student-head">

                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total No. of Student</h3>
                                <h4 id="num">{overview.no_of_students}</h4>
                            </div>
                        </div>

                    </div>

                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Course Uploaded</h3>
                                <h4 id="num">{overview.total_course}</h4>
                            </div>
                        </div>
                    </div>


                    <div className="student-head">
                        <div className="perimg">%</div>
                        <div>
                            <div className="text">
                                <h3 id="main-text">Total Student Enrolled</h3>
                                <h4 id="num">{overview.enroll_student}</h4>
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
                <h3>My Course</h3>
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
                            <td>aaa</td>
                            <td>aaa</td>
                            <td>aaa</td>
                            <td>aaa</td>
                        </tr>
                        {
                            course.map((record,key)=>{
                                return(
                                    <tr key={key}>
                            <td>{record.name}</td>
                            <td>{record.upload}</td>
                            <td>{record.tenroll}</td>
                            <td>{record.student_complete}</td>
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

export default TeacherDashboard
import React, { useEffect, useState } from 'react'
import './StudentDashboard.css'
import { Link } from 'react-router-dom'

function StudentDashboard() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const dbJson = "http://localhost:7000";
    const [course, setCourse] = useState([]);
    const [overview, setOverview] = useState([]);
    const [suggestion, setSuggestion] = useState([]);
    const getCourseList = () => {
        fetch(`${dbJson}/studentdashboard`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.log(error))
    }
    const getOverviewList = () => {
        fetch(`${dbJson}/studentdashboardoverview`)
            .then(response => response.json())
            .then(data => setOverview(data[0]))
            .catch(error =>console.log(error))
        // console.log(overview)
    }
    const getCourseSuggestion = () => {
        fetch(`${dbJson}/studentdashboardsuggestion`)
            .then(response => response.json())
            .then(data => setSuggestion(data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getCourseList();
        getOverviewList();
        getCourseSuggestion();
    }, [])
    return (
        <div>
            <div className="header-sd">
                <h1 align="left">Overview</h1>
            </div>

            <div className='over-afridi'>
                <div className='green-afridi'>
                    <div className='green-icon'>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1zm1 3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2H8z" fill="#000000" /><path d="M4 16.8V7.2c0-1.12 0-1.68.22-2.1a2 2 0 0 1 .87-.88C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.1.22a2 2 0 0 1 .88.87c.22.43.22.99.22 2.11v9.6c0 1.12 0 1.68-.22 2.1a2 2 0 0 1-.87.88c-.43.22-.99.22-2.11.22H7.2c-1.12 0-1.68 0-2.1-.22a2 2 0 0 1-.88-.87C4 18.48 4 17.92 4 16.8z" stroke="#000000" strokeWidth="2" /></svg>
                    </div>
                    <div className='text-in-green'>
                        <div className='greendiv-motive'>
                            <p>Ongoing course</p></div><div className='greendiv-head'>
                            <h3>{overview.ongoing_course} </h3></div>
                    </div>
                </div>

                <div className='green-afridi'>
                    <div className='green-icon'>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h8a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1zm1 3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2H8z" fill="#000000" /><path d="M4 16.8V7.2c0-1.12 0-1.68.22-2.1a2 2 0 0 1 .87-.88C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.1.22a2 2 0 0 1 .88.87c.22.43.22.99.22 2.11v9.6c0 1.12 0 1.68-.22 2.1a2 2 0 0 1-.87.88c-.43.22-.99.22-2.11.22H7.2c-1.12 0-1.68 0-2.1-.22a2 2 0 0 1-.88-.87C4 18.48 4 17.92 4 16.8z" stroke="#000000" strokeWidth="2" /></svg>
                    </div>
                    <div className='text-in-green'>
                        <div className='greendiv-motive'>
                            <p>Completed Course</p></div><div className='greendiv-head'>
                            <h3>{overview.completed_course}</h3></div>
                    </div>
                </div>

                <div className='green-afridi'>
                    <div className='green-icon'>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 1v18h-3v-1h2V2H2v16h8v1H1V1zm-7 2H8v1h8zm-2 3V5h-4v1zm-7 5H3v1h4zm0 2H3v1h4zm-4 3h2v-1H3zm14-3a2 2 0 1 1-2-2 2.002 2.002 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1.001 1.001 0 0 0 1-1zm.002-4.293a.965.965 0 0 0 1.32.55 1.08 1.08 0 0 1 1.213.207 1.066 1.066 0 0 1 .21 1.21.966.966 0 0 0 .548 1.324 1.064 1.064 0 0 1 0 2.004.965.965 0 0 0-.549 1.323A1.05 1.05 0 0 1 18 16.816v7.046l-3-2.538-3 2.538v-7.046a1.05 1.05 0 0 1-.744-1.49.965.965 0 0 0-.549-1.324 1.064 1.064 0 0 1 0-2.004.966.966 0 0 0 .549-1.324 1.066 1.066 0 0 1 .209-1.21 1.08 1.08 0 0 1 1.212-.206.965.965 0 0 0 1.32-.551 1.064 1.064 0 0 1 2.005 0zm.998 13v-5.04a.93.93 0 0 0-.998.625 1.064 1.064 0 0 1-2.004 0 .93.93 0 0 0-.998-.625v5.039l2-1.692zm-1.94-4.749a1.967 1.967 0 0 1 1.853-1.308 2.12 2.12 0 0 1 .87.197l.058-.091a1.964 1.964 0 0 1 1.116-2.695v-.122a1.966 1.966 0 0 1-1.116-2.695l-.087-.084a1.965 1.965 0 0 1-2.694-1.117h-.12a1.965 1.965 0 0 1-2.694 1.117l-.087.084a1.966 1.966 0 0 1-1.116 2.695v.122a1.964 1.964 0 0 1 1.116 2.695l.058.09a2.12 2.12 0 0 1 .87-.196 1.967 1.967 0 0 1 1.853 1.308L15 17z" /><path fill="none" d="M0 0h24v24H0z" /></svg>
                    </div>
                    <div className='text-in-green'>
                        <div className='greendiv-motive'>
                            <p>Certificates Earned</p> </div>
                        <h3>{overview.earned_certificate}</h3>
                    </div>
                </div>
            </div>


            <h1>Courses Your Taking</h1>

            <div className="display-info">
                <table className="table-h-afridi" width="100%">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Module Completed</th>
                            <th>Instructor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            course.map((record, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{record.course_name}</td>
                                        <td>{record.module_complete}</td>
                                        <td>{record.instructor}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <h1>Suggestion</h1>
            <div className="video-component">
                <div className="videos">
                    {suggestion.map((record, idx) => {
                        return (
                            <Link key={idx} to='courseDetail/BasicOfJs/' className='video-box-link'>
                                <div className="video-box">
                                    <div className="video-img" style={{ backgroundImage: `url(${record.image})` }}></div>
                                    <div className="video-info">
                                        <h1>{record.coursename}</h1>
                                    </div>
                                    <small>Duration:{record.duration} Hours</small>
                                </div>
                            </Link>

                        )
                    })}

                </div>
            </div>

        </div>
    )
}

export default StudentDashboard
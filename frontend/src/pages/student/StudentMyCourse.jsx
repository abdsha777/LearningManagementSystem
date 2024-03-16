import React, { useEffect, useState } from 'react'
import image from '../../assets/image.jpg'

function StudentMyCourse() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const dbJson = "http://localhost:7000";
    const [courses, setCourses] = useState([])
    function getCourses() {
        fetch(`${dbJson}/Course`)
            .then(req => req.json())
            .then(data => setCourses(data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getCourses();
    }, [])
    return (
        <div>
            <div className="video-component">
                <h3>Enrolled Course</h3>
                <div className="videos">

                    {
                        courses.filter(c => !c.is_complete).map((c, idx) => {
                            return (
                                <div className="video-box high" key={idx}>
                                    <div className="video-img" style={{ backgroundImage: `url(${c.course_image})` }}></div>
                                    <div className="video-info">
                                        <h1>{c.title}</h1>
                                        <h4 className='incomplete'>InComplete</h4>
                                    </div>
                                    <small>{c.month_left} Month left</small>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="video-component">
                <h2>Completed Course</h2>
                <div className="videos">
                    {
                        courses.filter(c => c.is_complete).map((c, idx) => {
                            return (
                                <div className="video-box" key={idx}>
                                    <div className="video-img" style={{ backgroundImage: `url(${c.course_image})` }}></div>
                                    <div className="video-info">
                                        <h1>{c.title}</h1>
                                        <h4>Completed</h4>
                                    </div>
                                    <small>{c.duration} hours</small>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentMyCourse
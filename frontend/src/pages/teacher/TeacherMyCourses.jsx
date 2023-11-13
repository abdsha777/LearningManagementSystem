import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './TeacherMyCourses.css'
import AuthContext from '../../context/AuthContext';


function TeacherMyCourses() {
    const { token } = useContext(AuthContext);
    // const dbJson = "http://localhost:7000";
    const backend = "http://localhost:5000";
    const [courses, setCourses] = useState([])

    const getCoureList = () => {
        fetch(`${backend}/api/course/mycourse/`, { headers: { token } })
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getCoureList();
    }, [])
    return (
        <div>

            <div>
                <h1>My Courses</h1>

                <div className="video-component">
                    <div className="videos">
                        {   
                            courses.map((course, key) => {
                                return (
                                    <Link className="video-box" key={key} to={'/editCourse/'+course._id}>
                                        <div className="video-img" style={{ backgroundImage: `url(${backend}/img/${course.courseImg})` }} ></div>
                                        <div className="video-info">
                                            <h1>{course.title   }</h1>
                                        </div>
                                        <small>Duration:{course.duration} Hours</small>
                                    </Link>

                                )
                            })
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default TeacherMyCourses
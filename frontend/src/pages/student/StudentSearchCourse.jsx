import React, { useEffect, useState } from 'react'
import image from '../../assets/image.jpg'

function StudentSearchCourse() {
    const dbJson = "https://jsonserver-6gyk.onrender.com";
    const [module, setModule] = useState([]);
    const [course, setCourse] = useState([]);

    const getModuleList = () => {
        fetch(`${dbJson}/student_module`)
            .then(response => response.json())
            .then(data => setModule(data))
            .catch(error => console.log(error))
    }
    const getCourseList = () => {
        fetch(`${dbJson}/StudentCourse`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.log(error))
    }
    useEffect(()=>{
        getModuleList();
        getCourseList();
    },[])
    return (
        <div>
            <div className="course-tag">
                <b>Find a Course</b>
                <div className="search">
                    <div className="search-box"><input type="text" className="search-bar" placeholder="Search Course" /></div>
                    <div className="filter-button"><button className="bton">Filter</button></div>
                </div>
            </div>
            {
                course.map((record, key) => {
                    return (
                        <div className="video-component">
                            <p className="heading">{record.course_name}</p>
                            <div className="videos">
                            {
                                module.map((rec, key) => {
                                    return (
                                       
                                            <div className="video-box">
                                                <div className="video-img" style={{backgroundImage:`url(${rec.image})`}}></div>
                                                <div className="video-info">
                                                    <h1>{rec.module_name}</h1>
                                                </div>
                                                <small>{rec.duration}</small>

                                            </div>
                                    )
                                })
                            }
                             </div>
                        </div>
                    )
                })
            }



        </div>
    )
}

export default StudentSearchCourse
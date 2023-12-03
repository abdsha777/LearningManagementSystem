import React, { useContext, useEffect, useState } from "react";
import image from "../../assets/image.jpg";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function StudentSearchCourse() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const backend = "http://localhost:5000";
    const { token } = useContext(AuthContext);
    const [course, setCourse] = useState([]);

    const getCourseList = () => {
        fetch(`${backend}/api/course/`, { headers: { token } })
            .then((response) => response.json())
            .then((data) => {setCourse(data);console.log(data)})
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getCourseList();
    }, []);
    return (
        <div>
            <div className="course-tag">
                <b>Find a Course</b>
                <div className="search">
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search Course"
                        />
                    </div>
                    <div className="filter-button">
                        <button className="bton">Filter</button>
                    </div>
                </div>
            </div>

            <div className="video-component">
                <p className="heading"></p>
                <div className="videos">
                    {course.courses && course.courses.map((c, idx) => {
                        return (
                            <Link to={'/courseDetail/'+c.id} className="video-box" key={idx}>
                                <div
                                    className="video-img"
                                    style={{
                                        backgroundImage: `url(${backend}/img/${c.courseImg})`,
                                    }}
                                ></div>
                                <div className="video-info">
                                    <h1>{c.title}</h1>
                                </div>
                                <small>Duration: {c.duration} hours</small>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default StudentSearchCourse;

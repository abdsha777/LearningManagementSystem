import React, { useContext, useEffect, useState } from "react";
import image from "../../assets/image.jpg";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function StudentSearchCourse() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const backend = import.meta.env.VITE_BACKEND;
    const { token } = useContext(AuthContext);
    const [course, setCourse] = useState([]);

    const getCourseList = () => {
        fetch(`${backend}/api/course/`, { headers: { token } })
            .then((response) => response.json())
            .then((data) => { setCourse(data); console.log(data) })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getCourseList();
    }, []);
    return (
        <div>
            <div className="topHeading">
                <h3>Find a course</h3>
                <div class="sub_heading">
                    <input type="text" placeholder="Search Courses" />
                    <button class="filterBtn">Filter</button>
                </div>
            </div>

            <div className="video-component">
                {/* <p className="heading"></p> */}
                <div className="videos">
                    {course.courses && course.courses.map((c, idx) => {
                        return (
                            <Link to={'/courseDetail/' + c.id} className="video-box" key={idx}>
                                <div
                                    className="video-img"
                                    style={{
                                        backgroundImage: `url(${backend}/img/${c.courseImg})`,
                                    }}
                                ></div>
                                <div className="video-info">
                                    <h5>{c.title}</h5>
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

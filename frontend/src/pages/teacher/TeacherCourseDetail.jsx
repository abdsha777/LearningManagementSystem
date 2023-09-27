import React from 'react'
import './TeacherCourseDetail.css'

function TeacherCourseDetail() {
    return (
        <div className="teacher-view-course">
            <div className="right-content">
                <div className="course-details">
                    <div className="course-right">
                        <p id="course-t">Course Title:</p>
                        <p id="ReactJS">ReactJS</p>
                        <p id="Duration">Duration:</p>
                        <p id="16Hours">16 Hours</p>
                        <p id="Faculty">Faculty:</p>
                        <p id="Science">Science</p>
                        <p id="Teacher-name">Teacher Name:</p>
                        <p id="Kamil-Khan">Kamil Khan</p>
                    </div>
                    <div className="course-img">
                        <img
                            src=".\images\image.jpg"
                        />
                    </div>
                </div>
                <br />
                <div className="Description">
                    <div className="desc">
                        <p style="color: #847e7e">Description:</p>
                    </div>
                    <div className="desc-deatail">
                        <p>
                            React is a powerful JavaScript library that you can use to build
                            user interfaces for web and mobile applications (apps). In this
                            course, you will explore the fundamental concepts that underpin
                            the React library and learn the basic skills required to build a
                            simple, fast, and scalable app.
                        </p>
                    </div>
                </div>
                <br />
                <div className="course-compl">
                    <div className="completed">
                        <p>Course Completed:</p>
                    </div>
                    <div className="toggle">
                        <input type="checkbox" name="checkbox" id="toggle" className="toggle-btn" />
                        <label htmlFor="toggle" className="switch"></label>
                    </div>
                </div>
                <br />
                <div className="module-but">
                    <div className="module-d">
                        <p>MODULE:</p>
                    </div>
                    <button className="add-module-btn">
                        <p>+ Add Module</p>
                    </button>
                    <button className="add-module-btn">
                        <p>+ Final Test</p>
                    </button>
                    <button className="update-course">
                        <p>Update Course</p>
                    </button>
                </div>
                <div className="module-details">
                    <div className="module1 module-box">
                        <div className="fun-react">
                            <div className="mod-text1">
                                <p>Fundamentals of React JS</p>
                            </div>
                            <div className="module-time">
                                <div className="module-seq">
                                    <p>Module 1</p>
                                </div>
                                <div className="dot"><p>.</p></div>
                                <div className="module-time">
                                    <p>13 Minutes</p>
                                </div>
                            </div>
                        </div>

                        <div className="view-btn">
                            <button className="view-module-btn">View Module</button>
                        </div>
                    </div>
                    <div className="module2 module-box">
                        <div className="mod-text">
                            <div className="mod-text1">
                                <p>Hooks</p>
                            </div>
                            <div className="module-time">
                                <div className="module-seq">
                                    <p>Module 2</p>
                                </div>
                                <div className="module-time">
                                    <p>18 Minutes</p>
                                </div>
                            </div>
                        </div>

                        <div className="view-btn">
                            <button className="view-module-btn">View Module</button>
                        </div>
                    </div>
                    <div className="module3 module-box">
                        <div className="mod-text3">
                            <div className="mod-text1">
                                <p>Virtaul DOM</p>
                            </div>
                            <div className="module-time">
                                <div className="module-seq">
                                    <p>Module 3</p>
                                </div>
                                <div className="module-time">
                                    <p>15 Minutes</p>
                                </div>
                            </div>
                        </div>

                        <div className="view-btn">
                            <button className="view-module-btn">View Module</button>
                        </div>
                    </div>

                    <div className="module4 module-box">
                        <div className="mod-text4">
                            <div className="mod-text1">
                                <p>Final Test</p>
                            </div>
                            <div className="module-time">
                                <div className="module-seq">
                                    <p>Module 4</p>
                                </div>
                                <div className="module-time">
                                    <p>20 Minutes</p>
                                </div>
                            </div>
                        </div>

                        <div className="view-btn">
                            <button className="view-module-btn">View Module</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pie-chart">
                <img
                    src=".\images\pie-chart.png"
                />
            </div>
        </div>
    )
}

export default TeacherCourseDetail

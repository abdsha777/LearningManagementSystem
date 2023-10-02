import React from 'react'
import './TeacherMyCourses.css'
import image from '../../assets/image.jpg'
function TeacherMyCourses() {
  return (
    <div>
        <div>
            <h1>My Course</h1>
            <div className="video-component">
                <div className="videos">

                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }} ></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }} ></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }} ></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>

                </div>
            </div>
            <div className="video-component">
                <h1>Web Development</h1>
                <div className="videos">
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }} ></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }} ></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }} ></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TeacherMyCourses
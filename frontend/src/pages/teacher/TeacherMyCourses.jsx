import React from 'react'
import './TeacherMyCourses.css'
import image from '../../assets/image.jpg'
function TeacherMyCourses() {
  return (
    <div>
        <div>
            <div className="course-tag">
                <b>Course's</b>
                <div className="search">
                    <div className="search-box"><input type="text" className="search-bar" placeholder="Search Course"/></div>
                    <div className="filter-button"><button className="bton">Filter</button></div>
                </div>
            </div>


            <div className="video-component">
                <p className="heading">Web Development</p>
                <div className="videos">
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                </div>
            </div>
            <div className="video-component">
                <p className="heading">Web Development</p>
                <div className="videos">
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
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
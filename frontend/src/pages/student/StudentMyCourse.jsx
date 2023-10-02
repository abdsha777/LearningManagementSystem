import React, { useState } from 'react'
import image from '../../assets/image.jpg'

function StudentMyCourse() {

    return (
        <div>
            <div className="video-component">
                <p className="heading">Enrolled Course</p>
                <div className="videos">
                    <div className="video-box high">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>InComplete</h4>
                        </div>
                        <small>3 Month left</small>
                    </div>
                    <div className="video-box high">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>InComplete</h4>
                        </div>
                        <small>3 Month left</small>
                    </div>
                    <div className="video-box high">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>InComplete</h4>
                        </div>
                        <small>3 Month left</small>
                    </div>

                </div>
            </div>
            <div className="video-component">
                <p className="heading">Completed Course</p>
                <div className="videos">
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>Completed</h4>
                        </div>
                        <small>3 Month left</small>
                    </div>
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>Completed</h4>
                        </div>
                        <small>3 Month left</small>
                    </div>
                    <div className="video-box">
                        <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>Completed</h4>
                        </div>
                        <small>3 Month left</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentMyCourse
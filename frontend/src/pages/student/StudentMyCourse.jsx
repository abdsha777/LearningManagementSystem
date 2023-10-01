import React from 'react'
import image from '../../assets/image.jpg'

function StudentMyCourse() {
  return (
    <div>
        <div className="video-component">
                <p className="heading">Enrolled Course</p>
                <div className="videos">
                    <div className="video-box high">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>InComplete</h4>
                        </div>
                        <small>3 Month left</small>

                    </div>
                    <div className="video-box medium">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4 className='medium'>InComplete</h4>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                    <div className="video-box low">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4 className='low'>InComplete</h4>
                        </div>
                        <small>3 Month left</small>

                    </div>
                </div>
            </div>
            <div className="video-component">
                <p className="heading">Completed Course</p>
                <div className="videos">
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>Completed</h4>
                        </div>
                        <small>3 Month left</small>

                    </div>
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>Completed</h4>
                        </div>
                        <small>Duration:16 Hours</small>

                    </div>
                    <div className="video-box">
                        <div className="video-img"><img src={image} alt="react video"/></div>
                        <div className="video-info">
                            <h1>Basic of JS</h1>
                            <h4>Completed</h4>
                        </div>
                        <small>Duration:16 Hours</small>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default StudentMyCourse
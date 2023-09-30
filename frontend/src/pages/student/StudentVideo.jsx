import React from 'react'
import './StudentVideo.css'

function StudentVideo() {
    return (

        <div className='student-video-page'>
            <div className="video-info1">

                <h4 id="video-no">Video No:</h4>
                <p>1</p>
                <h4>Video Name:</h4>
                <p>Basic Of JS</p>
                <h4>Status:</h4>
                <p>Completed</p>
            </div>
            <div className="video">
                <iframe src="https://www.youtube.com/embed/QFaFIcGhPoM?si=AKd3ieGL4pAVNduq"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>

            <div className="video-desc">
                <h4> Description: </h4>
                <p>React is a powerful JavaScript library that you can use to build user interfaces
                    for web and mobile applications (apps). In this course, you will explore
                    the fundamental concepts that underpin the React library and learn the basic skills
                    required to build a simple, fast, and scalable app.
                </p>
            </div>
            
            <div className="video-btns">
                <button className="btn btn-border cancel-btn">Previous</button>

                <button className="btn btn-filled">Next</button>
            </div>
        </div>
    )
}

export default StudentVideo

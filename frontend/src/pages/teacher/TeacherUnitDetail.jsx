import React from 'react'
import './TeacherUnitDetail.css'
import img from '../../assets/image.jpg'

function TeacherUnitDetail() {
  return (
    <div>
      <div className="module">
        <h3 className="heading">Module: </h3>
        <h3 className="heading">1</h3>
        <h2>Module Name:</h2>
        <p>Fundamentals of React JS</p>
        <h2>Duration:</h2>
        <p>13 Mintues</p>
        <h2>Description:</h2>
        <p>
          React is a powerful JavaScript library that you can use to build
          user interfaces for web and mobile applications (apps). In this
          course, you will explore the fundamental concepts that underpin the
          React library and learn the basic skills required to build a simple,
          fast, and scalable app.
        </p>
      </div>
      <div className="button">
        <button className="btn btn-filled">Update Module</button>
        <button className="btn btn-border-blue">+ Add Test</button>
        <button className="btn btn-border-blue">+ Add Videos</button>
        <button className="btn btn-filled notes-btn">
          Notes
          <svg fill="#ffffff" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M512 666.5L367.2 521.7l36.2-36.2 83 83V256h51.2v312.5l83-83 36.2 36.2L512 666.5zm-204.8 50.3V768h409.6v-51.2H307.2z" />
            </g>
          </svg>
        </button>
      </div>
      <div className="completed-box">

        <p> Module Completed :</p>
        <p>
          <input type="checkbox" name="checkbox" id="toggle" />
          <label htmlFor="toggle" className="switch"></label>
        </p>

      </div>
      <div className="video-component">
        <p className="heading">Videos :</p>
        <div className="videos">
          <div className="video-box">
            <img src={img} alt="react video" />
            <div className="video-info">
              <h1>Basic of JS</h1>
              <h4>Complete</h4>
              <small>Video 1</small>
            </div>
          </div>
          <div className="video-box">
            <img src={img} alt="react video" />
            <div className="video-info">
              <h1>Basic of JS</h1>
              <h4>Complete</h4>
              <small>Video 2</small>
            </div>
          </div>
          <div className="video-box">
            <img src={img} alt="react video" />
            <div className="video-info">
              <h1>Basic of JS</h1>
              <h4 className='incomplete'>InComplete</h4>
              <small>Video 3</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherUnitDetail

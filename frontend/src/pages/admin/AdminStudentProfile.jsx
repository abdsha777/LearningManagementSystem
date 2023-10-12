import React from 'react'
import './AdminStudentProfile.css'
import profileImg from '../../assets/Shehzad.png'
import image from '../../assets/image.jpg'
import donutChart from '../../assets/progress.png'
function AdminStudentProfile() {
    return (
        <div>
            <div class="main-content">
                <div class="profile-container">
                    <div class="profile-detail">
                        <h1>Student Profile</h1>
                        <div class="inner-detail">
                            <div class="profile-img">
                                <img src={profileImg} alt="" />
                            </div>
                            <div class="details">
                                <h3>Username:</h3>
                                <p>Shehzad</p>
                                <h3>User id:</h3>
                                <p>137809</p>
                                <h3>Faculty:</h3>
                                <p>Science</p>
                                <h3>Email:</h3>
                                <p>Af123@doodle.aAf123@doodle.abc </p>
                                <h3>Phone no:</h3>
                                <p>999999999</p>
                                <h3>Year:</h3>
                                <p>2023</p>
                            </div>
                        </div>
                    </div>
                    <div>

                        <div class="student-progress">
                            <h3>Student Progress</h3>
                            <img src={donutChart} alt="" />
                        </div>
                        <div class="video-component">
                            <p class="heading">Course</p>
                            <div class="videos">
                                <div class="video-box">
                                    <img src={image} alt="react video" />
                                    <div class="video-info">
                                        <h1>Basic of JS</h1>
                                        <h4>Complete</h4>
                                        <small>Video 1</small>
                                    </div>

                                </div>
                                <div class="video-box">
                                    <img src={image} alt="react video" />
                                    <div class="video-info">
                                        <h1>Fundamentals</h1>
                                        <h4>Complete</h4>
                                        <small>Video 2</small>
                                    </div>

                                </div>
                                <div class="video-box">
                                    <img src={image} alt="react video" />
                                    <div class="video-info">
                                        <h1>Module Test 1</h1>
                                        <h4 class="incomplete">InComplete</h4>
                                        <small>Video 3</small>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStudentProfile

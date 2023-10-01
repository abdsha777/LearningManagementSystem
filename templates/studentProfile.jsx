import React from 'react'
import './studentProfile.css'
function studentProfile() {
  return(
                <div class="profile-container">
                <div class="profile-detail">
                    <h1>Student Profile</h1>
                    <div class="inner-detail">
                        <div class="profile-img">
                            <img src="./images/shehzad.png" alt=""  width="80">
                            </img>
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
                    <img src="./images/progress.png" alt=""></img>
                </div>

                <div class="course-detail">
                    <h1>Courses</h1>
                    <div class="box-container">
                        <div class="box">
                            <img src="./images/reactjpeg.jpeg" alt=""></img>
                            <div class="course-info">
                                <h4>REACT JS</h4>
                                <h5> Completed</h5>
                            </div>
                            
                        </div>
                        <div class="box">
                            <img src="./images/reactjpeg.jpeg" alt=""></img>
                            <div class="course-info">
                                <h4>Fundamental</h4>
                                <h5> Completed</h5>
                            </div> 
                        </div>
                        
                        <div class="box">
                            <img src="./images/reactjpeg.jpeg" alt=""></img>
                            <div class="course-info">
                                <h4>Module 1 Test</h4>
                                <h5> Completed</h5>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
        </div>
         )
}
export default studentProfile

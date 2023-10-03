import React from 'react'
import './TeacherStudentProfile.css';
import img from '../../assets/abd.jpeg'
import image from '../../assets/image.jpg';
import image2 from '../../assets/progress.png';
import { Link } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


function TeacherStudentProfile() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options={
    plugins: {
      legend: {
        position: 'right',
      }
    }
  }
  
  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      <div className="profile-detail">
        <div className="inner-detail">
          <div className="profile-img">
            <img src={img} alt="" width="80">
            </img>
          </div>
          <div className="details">
            <h3>Username:</h3>
            <p>Shehzad</p>
            <h3>User id:</h3>
            <p>137809</p>
            <h3>Faculty:</h3>
            <p>Science</p>
            <h3>Email:</h3>
            <p>a@a.com </p>
            <h3>Phone no:</h3>
            <p>999999999</p>
            <h3>Year:</h3>
            <p>2023</p>
          </div>
        </div>
      </div>

      <div>
        <h1>Student Progress</h1>
        <div className="student-progress">
          <Doughnut
            data={data}
            options={options}
          />
        </div>

        <h1>Enrolled Course</h1>
        <div className="video-component">
          <div className="videos">
            <Link to='courseDetail/BasicOfJs/' className='video-box-link'>
              <div className="video-box">
                <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="video-info">
                  <h1>Javascript</h1>
                </div>
                <small>Duration:2 Hours</small>
              </div>
            </Link>
            <Link to='courseDetail/BasicOfJs/' className='video-box-link'>
              <div className="video-box">
                <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="video-info">
                  <h1>MongoDB</h1>
                </div>
                <small>Duration:11 Hours</small>
              </div>
            </Link>
            <Link to='courseDetail/BasicOfJs/' className='video-box-link'>
              <div className="video-box">
                <div className="video-img" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="video-info">
                  <h1>React</h1>
                </div>
                <small>Duration: 10 Hours</small>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TeacherStudentProfile;
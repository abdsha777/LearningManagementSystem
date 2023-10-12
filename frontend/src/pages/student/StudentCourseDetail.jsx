import React, { useState, useEffect } from "react";
import Doubts from "../../components/chat/Doubts";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function StudentCourseDetail() {
  const dbJson = "https://jsonserver-6gyk.onrender.com";
  let size = 1;
  const [course, setCourse] = useState([]);
  const [Module, setModule] = useState([]);
  const getCourseList = () => {
    fetch(`${dbJson}/Student_Course_Detail`)
      .then(response => response.json())
      .then(data => setCourse(data[0]))
      .catch(error => console.log(error))
  }
  const getModuleList = () => {
    fetch(`${dbJson}/Modules`)
      .then(response => response.json())
      .then(data => setModule(data))
      .catch(error => console.log(error))
    size = Module.length;
  }
  useEffect(() => {
    getCourseList();
    getModuleList();
  }, [])
  return (
    <div className="teacher-view-course">
      <div className="right-content">
        <div className="course-details">
          <div className="course-right">
            <p id="course-t">Course Title:</p><p id="ReactJS">{course.title}</p>
            <p id="Duration">Duration:</p><p id="16Hours">{course.faculty} Hours</p>
            <p id="Faculty">Faculty:</p><p id="Science">{course.faculty}</p>
            <p id="Teacher-name">Teacher Name:</p><p id="Kamil-Khan">{course.teacher_name}</p>
          </div>
          <div className="course-img">
            <img src={course.image} />
          </div>
        </div>
        <br />
        <div className="Description">
          <div className="desc">
            <p>Description:</p>
          </div>
          <div className="desc-deatail">
            <p>
              {course.Description}
            </p>
          </div>
        </div>
        <br />

        <div className="module-details">
          {
            Module.map((record, key) => {
              return (
                <div className={`${"module-box"} ${key == 0 ? 'first' : ''} ${size == key - 2 ? 'last' : ''}`} key={key}>
                  <div className="fun-react">
                    <div className="mod-text1">
                      <p>{record.name}</p>
                    </div>
                    <div className="module-time">
                      <div className="module-seq">
                        <p>Module {record.no}</p>
                      </div>
                      <div className="dot">
                        <p>.</p>
                      </div>
                      <div className="module-time">
                        <p>{record.duration} Minutes</p>
                      </div>
                    </div>
                  </div>

                  <div className="view-btn">
                    <Link to='unitDetail/1/'>
                      <button className="view-module-btn">View Module</button>
                    </Link>
                  </div>
                </div>
              )
            })

          }
        </div>
        <div className="enroll-btn">
          <button className="enroll-module-btn btn btn-filled">Enroll</button>
        </div>
      </div>
      <div className="left-content">

        <Doubts />
      </div>
    </div>
  );
}

export default StudentCourseDetail;

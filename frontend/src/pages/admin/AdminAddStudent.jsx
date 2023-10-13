import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function AdminAddStudent() {
  const endpoint = "http://localhost:7000";
  const [student, setStudent] = useState({});
  const { id } = useParams();
  const { role } = useContext(AuthContext);
  const nav = useNavigate();
  const navPath = role=="admin"?"/adminStudentlist":"/teacherStudentlist";
  const getStudentList = () => {
    fetch(`${endpoint}/Admin_Teacher_student/` + id)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.log);
  };
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };
  function updateStudent() {
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }
    fetch(`${endpoint}/Admin_Teacher_student/` + id, init)
    .then((response) => response.json())
    .then((data) => nav(navPath))
    .catch((err) => console.log(err));
  }
  function addStudent() {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }
    fetch(`${endpoint}/Admin_Teacher_student/`, init)
    .then((response) => response.json())
    .then((data) => nav(navPath))
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    if(id)getStudentList();
  }, []);

  return (
    <div>
      <div className="main">
        <div>
          <h2>{id?"Update":"Add"} Student</h2>
        </div>

        <div className="add_form">
          <div className="input-box">
            <label htmlFor="cname">Student Name</label>
            <input
              type="text"
              id="cname"
              placeholder="Name"
              name="name"
              value={student.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <p>Faculty</p>
            <select name="faculty" id="faculty" value={student.faculty || ""} onChange={handleChange}>
              <option value="---">---</option>
              <option value="arts">Arts</option>
              <option value="science">Scince</option>
              <option value="commerce">commerce</option>
            </select>
          </div>
          <div className="input-box">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              name="year"
              placeholder="Year"
              value={student.year || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="module_btn">
          <p> Module:</p>
          <button className="btn btn-border-blue">+ Add Module</button>
        </div>
      </div>

      <div className="cancel_save">
        <button className="btn btn-border cancel-btn">Cancel</button>

        {
            id?(
                <button className="btn btn-filled" onClick={updateStudent}>Update</button>
            ):(
                <button className="btn btn-filled" onClick={addStudent}>Update</button>
            )
        }
      </div>
    </div>
  );
}

export default AdminAddStudent;

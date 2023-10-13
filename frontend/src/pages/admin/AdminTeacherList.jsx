import React, { useState, useEffect } from "react";
import './AdminTeacherList.css';
import { Link } from "react-router-dom";

function AdminTeacherList() {
  // const dbJson = "https://jsonserver-6gyk.onrender.com";
  const dbJson = "http://localhost:7000";
  const [teacher, setTeacher] = useState([]);
  const getTeacherList = () => {
    fetch(`${dbJson}/Admin_Teacher`)
      .then(response => response.json())
      .then(data => setTeacher(data))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getTeacherList();
  }, [])

  return (
    <div className="main_module">
      <p className="heading">Teachers List</p>
      <div className="module2">
        <Link to={"add/"}className="btn btn-border-blue">+ Add Teacher</Link>
        <button className="btn btn-border-blue">Bulk Upload</button>
      </div>
      <div className="sub_heading">
        <input type="text" placeholder="Search Students" />
        <button className="filter1">Filter </button>
      </div>
      <div className="module2">
        <button className="btn btn-filled big">Set Status</button>
      </div>
      <div className="module5">
        <table>
          <thead>
            <tr>
              <th>Teacher Id</th>
              <th>Teacher Name</th>
              <th>Faculty</th>
              <th>Total No of Course Uploaded</th>
              <th>Update</th>
              <th>View</th>
              <th className="status">Active</th>
            </tr>
          </thead>
          <tbody>
            {
              teacher.map((record, key) => {
                return (
                  <tr key={key}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.faculty}</td>
                    <td>{record.no_of_course}</td>
                    <td>
                      <button>Update</button>
                    </td>
                    <td>
                      <button>View</button>
                    </td>
                    <td>
                      <button className="status">{record.status}</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTeacherList;

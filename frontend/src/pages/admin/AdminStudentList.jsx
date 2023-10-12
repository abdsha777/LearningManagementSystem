import React,{useState,useEffect} from 'react'
import './AdminStudentList.css'
import { Link } from 'react-router-dom';

function AdminStudentList() {
  // const dbJson = "https://jsonserver-6gyk.onrender.com";
  const dbJson = "http://localhost:7000";
  const [student, setStudent] = useState([]);
  const getStudentList = () => {
    fetch(`${dbJson}/Admin_Teacher_student`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.log(error))
  }
  useEffect(()=>{
    getStudentList();
  },[])
  return (
    <div className="main_module">
      <h1>Students List</h1>

      <div className="module2">
        <button className="btn btn-border-blue"><Link to={"add/"}>+ Add Students</Link></button>
        <button className="btn btn-border-blue">Bulk Upload</button>
      </div>

      <div className="sub_heading">
        <input type="text" placeholder="Search Students" />

        <input type="button" className="filter1" value="Filter >" />
      </div>


      <div className="module2">
        <button className="btn btn-filled big">Set Status</button>
      </div>

      <div className="module5">
        <table>
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
              <th>Faculty</th>
              <th>Year</th>
              <th>Total No of <br /> Enrolled Courses</th>
              <th>Ongoing Course</th>
              <th>Completed Course</th>
              <th>Update</th>
              <th>View</th>
              <th className="status">Active</th>
            </tr>
          </thead>
          <tbody>
          {
              student.map((record, key) => {
                return (
                  <tr key={key}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.faculty}</td>
                    <td>{record.year}</td>
                    <td>{record.enroll}</td>
                    <td>{record.ongoing}</td>
                    <td>{record.completed}</td>
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
  )
}

export default AdminStudentList
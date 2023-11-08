import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import './AdminAddStudent.css';


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

  // bulk upload

  const [files, setFiles]= useState({});
  const [invalid, setInvalid]= useState(false);
  const [uploaded, setUploaded]= useState(false);

  function fileSelected(e){
    setUploaded(false)
    console.log(e.target.files[0]);
    if(
        e.target.files[0].type=="text/csv" ||
        e.target.files[0].type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ){
      setFiles(e.target.files[0])
      setInvalid(false)
    }else{
      setInvalid(true)
      setFiles({})
    }
  }
  function uploadFile(){
    console.log("uploaded "+files.name)
    setUploaded(true)
    setFiles({})
  }


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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              value={student.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label htmlFor="faculty">Faculty</label>
            <select name="faculty" id="faculty" value={student.faculty || ""} onChange={handleChange}>
              <option value="---">---</option>
              <option value="arts">Arts</option>
              <option value="science">Scince</option>
              <option value="commerce">commerce</option>
            </select>
          </div>
          <div className="input-box">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              name="class"
              placeholder="Class"
              value={student.class || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="cancel_save">
        <button className="btn btn-border cancel-btn">Cancel</button>

        {
            id?(
                <button className="btn btn-filled" onClick={updateStudent}>Update</button>
            ):(
                <button className="btn btn-filled" onClick={addStudent}>Add</button>
            )
        }
      </div>

      <div className="bulkUpload">
        <h2>Bulk Upload</h2>
        <input type="file" id="bulk" name="bulk" onChange={fileSelected}/>
        <label htmlFor="bulk">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
            <path d="M0 17H14V15H0V17ZM0 7H4V13H10V7H14L7 0L0 7Z" fill="black"/>
          </svg>  
          Choose a file
        </label>
        {/* <button className="btn btn-filled" onClick={addStudent}>Bulk Upload</button> */}
        <div className="invalid">
          {
            invalid?"Invalid File Type":""
          }
        </div>
        <div className="uploaded">
          {
            uploaded?"Uploaded Successfully":""
          }
        </div>
        <div className="file">
          {
            files.name?(
              <>
                <h4> File Name: {files.name}</h4>
                <h4> File Size: {files.size}</h4>
                <button className="btn btn-filled" onClick={uploadFile}> Upload</button>
              </>
            ):""
          }
        </div>
      </div>

    </div>
  );
}

export default AdminAddStudent;

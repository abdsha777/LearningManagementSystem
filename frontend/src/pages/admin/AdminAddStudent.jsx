import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import './AdminAddStudent.css';


function AdminAddStudent() {
    const endpoint = import.meta.env.VITE_BACKEND;
    const [student, setStudent] = useState({});
    const { id } = useParams();
    const { role } = useContext(AuthContext);
    const nav = useNavigate();
    const navPath = role == "admin" ? "/adminStudentlist/" : "/teacherStudentlist/";
    const { token } = useContext(AuthContext);
    const [message, setMessage] = useState(null)

    const getStudent = () => {
        fetch(`${endpoint}/api/users/student/${id}/`, { headers: { token } })
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
        console.log(student)
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify(student),
        }
        fetch(`${endpoint}/api/users/student/${id}`, init)
            .then((response) => response.json())
            .then((data) => nav(navPath))
            .catch((err) => console.log(err));
    }

    async function addStudent() {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify(student),
        }
        const res = await fetch(endpoint + "/api/auth/registerstudent/", init)
        // console.log(res)
        if (res.ok) {
            const data = await res.json();
            setStudent({})
            setMessage("Registration Successful! email/pass: " + data.email + "/" + data.password)

        } else {
            setMessage("Invalid Details")
        }
    }

    useEffect(() => {
        if (id) getStudent();
    }, []);

    // bulk upload

    const [files, setFiles] = useState({});
    const [invalid, setInvalid] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    function fileSelected(e) {
        setUploaded(false)
        console.log(e.target.files[0]);
        if (
            e.target.files[0].type == "text/csv" ||
            e.target.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            setFiles(e.target.files[0])
            setInvalid(false)
        } else {
            setInvalid(true)
            setFiles({})
        }
    }
    function uploadFile() {
        console.log("uploaded " + files.name)
        setUploaded(true)
        setFiles({})
    }


    return (
        <div>
            <div className="studentForm">
                <div className="backlink">
                    <Link to={navPath}>&larr; back</Link>
                </div>
                {
                    message && (
                        <div className="message">
                            <h1>{message}</h1>
                        </div>
                    )
                }

                <h3 className="title">{id ? "Update" : "Add"} Student</h3>
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
                            required
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
                    <div className="input-box">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={student.phoneNumber || ""}
                            onChange={handleChange}
                        />
                    </div>
                    {
                        id && (
                            <>
                                <div className="input-box">
                                    <label htmlFor="phoneNumber">Is Active</label>
                                    <input
                                        type="checkbox"
                                        id="phoneNumber"
                                        name="active"
                                        placeholder="Phone Number"
                                        checked={student.active || false}
                                        onChange={() => setStudent({ ...student, active: !student.active })}
                                    />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <div className="cancel_save">
                <button className="btn btn-border cancel-btn">Cancel</button>

                {
                    id ? (
                        <button className="btn btn-filled" onClick={updateStudent}>Update</button>
                    ) : (
                        <button className="btn btn-filled" onClick={addStudent}>Add</button>
                    )
                }
            </div>

            <div className="bulkUpload">
                <h4>Bulk Upload</h4>
                <input type="file" id="bulk" name="bulk" onChange={fileSelected} />
                <label htmlFor="bulk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                        <path d="M0 17H14V15H0V17ZM0 7H4V13H10V7H14L7 0L0 7Z" fill="black" />
                    </svg>
                    Choose a file
                </label>
                {/* <button className="btn btn-filled" onClick={addStudent}>Bulk Upload</button> */}
                <div className="invalid">
                    {
                        invalid ? "Invalid File Type" : ""
                    }
                </div>
                <div className="uploaded">
                    {
                        uploaded ? "Uploaded Successfully" : ""
                    }
                </div>
                <div className="file">
                    {
                        files.name ? (
                            <>
                                <h4> File Name: {files.name}</h4>
                                <h4> File Size: {files.size}</h4>
                                <button className="btn btn-filled" onClick={uploadFile}> Upload</button>
                            </>
                        ) : ""
                    }
                </div>
            </div>

        </div>
    );
}

export default AdminAddStudent;

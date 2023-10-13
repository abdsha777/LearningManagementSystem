import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function AdminAddTeacher() {
    const endpoint = "http://localhost:7000";
    const [teacher, setTeacher] = useState({});
    const { id } = useParams();
    const nav = useNavigate();
    const getTeacherList = () => {
        fetch(`${endpoint}/Admin_Teacher/` + id)
            .then((response) => response.json())
            .then((data) => setTeacher(data))
            .catch((error) => console.log);
    };
    const handleChange = (e) => {
        setTeacher({
            ...teacher,
            [e.target.name]: e.target.value,
        });
    };
    function updateTeacher() {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacher),
        }
        fetch(`${endpoint}/Admin_Teacher/` + id, init)
            .then((response) => response.json())
            .then((data) => nav("/teacherlist"))
            // .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
    function addTeacher() {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacher),
        }
        fetch(`${endpoint}/Admin_Teacher/`, init)
            .then((response) => response.json())
            .then((data) => nav("/teacherlist"))
            // .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (id) getTeacherList();
    }, []);

    return (
        <div>
            <div className="main">
                <div >
                    <h2>{id ? "Update" : "Add"} Teacher</h2>
                </div>

                <div className="add_form">
                    <div className="input-box">
                        <label htmlFor="cname">Teacher Name</label>
                        <input type="text" id="cname" placeholder="name" name='name' value={teacher.name || ""} onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="faculty">Faculty</label>
                        <input type="text" id="faculty" placeholder="faculty" name='faculty' value={teacher.faculty || ""} onChange={handleChange} />
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
                    id ? (
                        <button className="btn btn-filled" onClick={updateTeacher}>Update</button>
                    ) : (
                        <button className="btn btn-filled" onClick={addTeacher}>Add</button>
                    )
                }

            </div>
        </div >
    )
}

export default AdminAddTeacher
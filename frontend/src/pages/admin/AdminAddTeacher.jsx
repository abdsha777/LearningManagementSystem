import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function AdminAddTeacher() {
    const endpoint = import.meta.env.VITE_BACKEND;
    const [teacher, setTeacher] = useState({ role: "teacher" });
    const { id } = useParams();
    const nav = useNavigate();
    const { token } = useContext(AuthContext);
    const [message, setMessage] = useState(null)

    const getTeacherList = () => {
        fetch(`${endpoint}/api/users/teacher/${id}`, { headers: { token } })
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
                token
            },
            body: JSON.stringify(teacher),
        }
        fetch(`${endpoint}/api/users/teacher/${id}`, init)
            .then((response) => response.json())
            .then((data) => nav("/teacherlist"))
            // .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
    async function addTeacher() {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token
            },
            body: JSON.stringify(teacher),
        }
        const res = await fetch(`${endpoint}/api/auth/register/`, init)

        if (res.ok) {
            const data = await res.json();
            setTeacher({ role: "teacher" })
            setMessage("Registration Successful! email/pass: " + data.email + "/" + data.password)

        } else {
            const err = await res.json()
            setMessage("Invalid Details - "+err.errors[0].path)
        }
    }

    useEffect(() => {
        if (id) getTeacherList();
    }, []);

    return (
        <div>
            <div className="main">
                <div className="backlink">
                    <Link to={"/teacherlist"}>&larr; back</Link>
                </div>
                {
                    message && (
                        <div className="message">
                            <h1>{message}</h1>
                        </div>
                    )
                }
                <div >
                    <h2>{id ? "Update" : "Add"} Teacher</h2>
                </div>

                <div className="add_form">
                    <div className="input-box">
                        <label htmlFor="cname">Teacher Name</label>
                        <input type="text" id="cname" placeholder="Name" name='name' value={teacher.name || ""} onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Email" name='email'
                            value={teacher.email || ""} onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="department">Department</label>
                        <input type="text" id="department" placeholder="Department"
                            name='department' value={teacher.department || ""} onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="position">Position</label>
                        <input type="text" id="position" placeholder="Position"
                            name='position' value={teacher.position || ""} onChange={handleChange}
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
                                        checked={teacher.active || false}
                                        onChange={() => setTeacher({ ...teacher, active: !teacher.active })}
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
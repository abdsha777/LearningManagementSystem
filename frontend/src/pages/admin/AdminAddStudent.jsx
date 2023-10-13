import React, { useState } from 'react'


function AdminAddStudent() {

    const endpoint = "http://localhost:7000/Admin_Teacher_student";
    const [student, setStudent] = useState([]);
    const getStudentList = () => {
        fetch(`${endpoint}`)
            .then(response => response.json())
            .then(data => setStudent(data))
            .catch(error => console.log(error))
    }

    const Add = () => {
        const [student, setStudent] = useState({});

        const handleInputChange = (event) => {
            const { name, value } = event.target;

            setStudent((prevstudent) => ({
                ...prevstudent,
                [name]: value,
            }));
        };

        const addRecord = (event) => {
            event.preventDefault();
            fetch(`${endpoint}`, {
                method: "POST"
            })

                .then(response => response.json())
                .then(data => setStudent(data))
                .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <div className="main">
                <div >
                    <h2>Add Student</h2>
                </div>

                <div className="add_form">
                    <div className="input-box">
                        <label htmlFor="cname">Student Name</label>
                        <input type="text" id="cname" placeholder="Name" value={student.name} onChange={() => {
                            handleInputChange(event)
                        }} />
                    </div>
                    <div className="input-box">
                        <p>Faculty</p>
                        <select name="" id="">
                            <option value="">Arts</option>
                            <option value="">Scince</option>
                            <option value="">commerce</option>
                        </select>

                    </div>
                    <div className="input-box">
                        <label htmlFor="cname">Year</label>
                        <input type="text" id="cname" placeholder="Year" value={student.name} onChange={() => {
                            handleInputChange(event)
                        }} />
                    </div>

                </div>

                <div className="module_btn">
                    <p> Module:</p>
                    <button className="btn btn-border-blue">+ Add Module</button>
                </div>

            </div>

            <div className="cancel_save">
                <button className="btn btn-border cancel-btn">Cancel</button>

                <button className="btn btn-filled">Save</button>

            </div>
        </div >
    )
}

export default AdminAddStudent
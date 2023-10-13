import React from 'react'

function AdminAddTeacher() {
    return (
        <div>
            <div className="main">
                <div >
                    <h2>Add Teacher</h2>
                </div>

                <div className="add_form">
                    <div className="input-box">
                        <label htmlFor="cname">Teacher Name</label>
                        <input type="text" id="cname" placeholder="name" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="faculty">Faculty</label>
                        <input type="text" id="faculty" placeholder="faculty" />
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

export default AdminAddTeacher
import React from 'react'

function AdminAddStudent() {
    return (
        <div>
            <div className="main">
                <div >
                    <h2>Add Student</h2>
                </div>

                <div className="add_form">
                    <div className="input-box">
                        <label htmlFor="cname">Student Name</label>
                        <input type="text" id="cname" placeholder="Name" />
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
                        <input type="text" id="cname" placeholder="Year" />
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
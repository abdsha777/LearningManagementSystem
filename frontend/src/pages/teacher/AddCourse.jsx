import React from 'react'

function AddCourse() {
    return (
        <div>
            <div className="main">
                <div >
                    <h2>Add New Course</h2>
                </div>

                <div className="add_form">
                    <div className="input-box">
                        <label htmlFor="cname">Course Name</label>
                        <input type="text" id="cname" placeholder="Name" />


                    </div>

                    <div className="input-box">
                        <label htmlFor="duration">Duration</label>
                        <input type="number" id="duration" placeholder="Duration" />


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
                        <p>Category</p>
                        <select name="" id="">
                            <option value="">Full Stack Developer</option>
                            <option value="">Physicology</option>
                            <option value="">Business Understanding</option>
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="desc">Description</label>
                        <textarea placeholder="Enter Description"></textarea>

                    </div>

                    <div className="input-box">
                        <p>Update Course Image/Thumbail OF course</p>
                        <div clas='bulkUploadContainer'>
                            <div className="parent">
                                <div className="input">
                                    <input type="file" className="ip" id="fileip" />
                                </div>
                                <div className="label" htmlFor="fileip">
                                    <label htmlFor="fileip">
                                        <img src="" alt="" className="uploadImgLogo" />
                                        <p className="text">
                                            click to uplaod
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>


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

export default AddCourse;

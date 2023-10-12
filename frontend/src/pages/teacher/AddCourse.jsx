import React from 'react'

function AddCourse() {
    return (
        <div>
            <form action="">
                <div class="main">
                    <div class="heading">
                        <h2>Add New Course</h2>
                    </div>

                    <div class="add_form">
                        <div class="input-box">
                            <label for="cname">Course Name</label>
                            <input type="text" id="cname" placeholder="Name" />


                        </div>

                        <div class="input-box">
                            <label for="duration">Duration</label>
                            <input type="number" id="duration" placeholder="Duration" />


                        </div>

                        <div class="input-box">
                            <p>Faculty</p>
                            <select name="" id="">
                                <option value="">Arts</option>
                                <option value="">Scince</option>
                                <option value="">commerce</option>
                            </select>

                        </div>

                        <div class="input-box">
                            <p>Category</p>
                            <select name="" id="">
                                <option value="">Full Stack Developer</option>
                                <option value="">Physicology</option>
                                <option value="">Business Understanding</option>
                            </select>
                        </div>

                        <div class="input-box">
                            <label for="desc">Description</label>
                            <textarea placeholder="Enter Description"></textarea>

                        </div>

                        <div class="input-box">
                            <p>Update Course Image/Thumbail OF course</p>
                            <div clas='bulkUploadContainer'>
                                <div class="parent">
                                    <div class="input">
                                        <input type="file" class="ip" id="fileip" />
                                    </div>
                                    <div class="label" for="fileip">
                                        <label for="fileip">
                                            <img src={uiLogo} alt="" className="uploadImgLogo" />
                                            <p class="text">
                                                click to uplaod
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="module_btn">
                        <p> Module:</p>
                        <button class="btn btn-border-blue">+ Add Module</button>
                    </div>

                </div>

                <div class="cancel_save">
                    <button class="btn btn-border cancel-btn">Cancel</button>

                    <button class="btn btn-filled">Save</button>

                </div>


            </form >
        </div >
    )
}

export default AddCourse
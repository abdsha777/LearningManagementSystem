import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddCourse() {
    const endpoint = import.meta.env.VITE_BACKEND;
    const [course, setCourse] = useState({});
    const { token } = useContext(AuthContext);
    const nav = useNavigate();

    const [img, setImg] = useState(null);
    const [msg, setMsg] = useState(null);
    function fileSelected(e) {
        const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (e.target.files[0].size > 1000000) {
            setMsg("Image less than 1mb");
            return;
        }
        if (acceptedImageTypes.includes(e.target.files[0].type)) {
            setImg(URL.createObjectURL(e.target.files[0]));
            setMsg(null);
            setCourse({
                ...course,
                courseImg: e.target.files[0],
            });
        } else {
            setMsg("Invalid Image Type");
            setImg(null);
            setFile(null);
        }
    }

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value,
        });
    };

    async function createCourse(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", course.title);
        formDataToSend.append("description", course.description);
        formDataToSend.append("duration", course.duration);
        formDataToSend.append("courseImg", course.courseImg);
        // console.log(formDataToSend)
        const res = await fetch(endpoint + "/api/course/create/", {
            method: "POST",
            headers: { token },
            body: formDataToSend,
        });
        const data = await res.json();
        if (res.ok) {
            setMsg("Course Created");
            nav("/mycourse/");
        } else {
            // console.log(data)
            setMsg("Invalid");
        }
    }

    return (
        <form className="addCourseForm">
            <h3>Add New Course</h3>

            <div className="add_form">
                <div className="input-box">
                    <label htmlFor="cname">Course Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Name"
                        name="title"
                        value={course.title || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="duration">
                        Duration <small>In hours</small>
                    </label>
                    <input
                        type="number"
                        id="duration"
                        placeholder="Duration"
                        name="duration"
                        value={course.duration || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="desc">
                        Description <small>About the course</small>
                    </label>
                    <textarea
                        placeholder="Enter Description"
                        name="description"
                        value={course.description || ""}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="input-box">
                    <p>
                        Upload course thumbnail <small>16x9 prefered</small>{" "}
                    </p>
                    <div clas="bulkUploadContainer">
                        <div className="parent">
                            <div className="input" onChange={fileSelected}>
                                <input
                                    type="file"
                                    className="ip"
                                    id="fileip"
                                    accept="image/*"
                                    size={1000000}
                                />
                            </div>
                        </div>
                    </div>
                    {img && <img src={img} className="preview" />}
                </div>
            </div>

            {/* <div className="module_btn">
                <p> Module:</p>
                <button className="btn btn-border-blue">+ Add Module</button>
            </div> */}

            {msg && <h4 className="errorMessage">{msg}</h4>}

            <div className="cancel_save">
                <button className="btn btn-border cancel-btn">Cancel</button>

                <button className="btn btn-filled" onClick={createCourse}>
                    Save
                </button>
            </div>
        </form>
    );
}

export default AddCourse;

import React, { useState } from 'react'
import Popup from './MyPopup'
import { useNavigate } from 'react-router-dom';

function EditCoursePopup({ handler, data, token, refresh }) {
    const backend = import.meta.env.VITE_BACKEND;
    const [msg, setMsg] = useState(null);
    const [course,setCourse] = useState(data);
    const [img, setImg] = useState(`${backend}/img/`+data.courseImg);
    const [file,setFile] = useState(null);
    const nav = useNavigate();

    function handleChange(e){
        setCourse({
            ...course,
            [e.target.name]: e.target.value,
        });
    };

    function fileSelected(e){
        setImg(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    async function updateCourse(e,hide) {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', course.title);
        formDataToSend.append('description', course.description);
        formDataToSend.append('duration', course.duration);
        if(file){
            formDataToSend.append('courseImg', file);
        }
        // console.log(formDataToSend)
        const res = await fetch(backend+"/api/course/update/"+course._id, {
            method: 'POST',
            headers: { token },
            body: formDataToSend
        })
        const data = await res.json();
        if (res.ok) {
            setMsg("Course Updated")
            // nav('/editCourse/'+course._id)
            refresh();
            hide();
        } else {
            // console.log(data)
            setMsg("Invalid")
        }
    }

    return (
        <Popup handler={handler}>
            {({ hide }) => (
                <>
                    <h3>Edit Course</h3>
                    <div className="input-box">
                        <label htmlFor="cname">Course Title</label>
                        <input type="text" id="title" placeholder="Name"
                            name="title"
                            value={course.title || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="duration">Duration <small>In hours</small></label>
                        <input type="number" id="duration" placeholder="Duration"
                            name='duration'
                            value={course.duration || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="desc">Description <small>About the course</small></label>
                        <textarea placeholder="Enter Description"
                            name='description'
                            value={course.description || ""}
                            onChange={handleChange}
                        ></textarea>

                    </div>
                    <div className="input-box">
                        <p>Upload course thumbnail <small>16x9 prefered</small> </p>
                        <div clas='bulkUploadContainer'>
                            <div className="parent">
                                <div className="input" >
                                    <input type="file" className="ip" id="fileip" accept='image/*' size={1000000} onChange={fileSelected} />
                                </div>
                            </div>
                        </div>
                        {
                            img && (
                                <img src={img} className='preview' />
                            )
                        }
                        {
                            msg && (
                                <h2 className='errorMessage'>{msg}</h2>
                            )
                        }
                    </div>
                    <div className="cancel_save">
                        <button className="btn btn-border cancel-btn" onClick={hide}>Cancel</button>

                        <button className="btn btn-filled" onClick={(e) => updateCourse(e, hide)}>Update</button>
                    </div>
                </>
            )}
        </Popup>
    )
}

export default EditCoursePopup
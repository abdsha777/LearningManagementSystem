import React, { useEffect, useState } from 'react'
import Popup from './MyPopup'
import { useNavigate } from 'react-router-dom';

function AddEditVideo({ handler, data, token, refresh, unitId, edit }) {
    const endpoint=import.meta.env.VITE_BACKEND;
    const [msg, setMsg] = useState(null);
    const [video, setVideo] = useState({unitId:unitId});
    const nav = useNavigate();

    function handleChange(e) {
        setVideo({
            ...video,
            [e.target.name]: e.target.value,
        });
    };

    async function addVideo(hide){
        const res = await fetch(endpoint+"/api/video/create",{
            method:"POST",
            headers:{token,'Content-Type':"application/json"},
            body: JSON.stringify(video)
        })
        const data = await res.json()
        console.log(data)
        if(res.ok){
            refresh();
            hide()
        }else{
            setMsg("Invalid Data")
        }
    }
    async function editVideo(hide){
        console.log(video)
        const res = await fetch(endpoint+"/api/video/update",{
            method:"PUT",
            headers:{token,'Content-Type':"application/json"},
            body: JSON.stringify(video)
        })
        const data = await res.json()
        console.log(data)
        if(res.ok){
            refresh();
            hide()
        }else{
            setMsg("Invalid Data")
        }
    }

    useEffect(()=>{
        if(edit){   
            setVideo(data);
            console.log(data)
        }
    },[])

    return (
        <Popup handler={handler}>
            {({ hide }) => (
                <>
                    <h1>{edit?"Edit":"Add"} Video</h1>
                    <div className="input-box">
                        <label htmlFor="cname">Video Title</label>
                        <input type="text" id="title" placeholder="Name"
                            name="title"
                            value={video.title || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="duration">Youtube Link <small>In hours</small></label>
                        <label style={{ marginTop: "-10px" }} htmlFor="duration"><small>Example: https://www.youtube.com/watch?v=ko7YMs9Q3KU</small></label>
                        <input type="text" id="duration" placeholder="https://www.youtube.com/watch?v=ko7YMs9Q3KU"
                            name='url'
                            value={video.url || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="desc">Description <small>About the video</small></label>
                        <textarea placeholder="Enter Video Description"
                            name='description'
                            value={video.description || ""}
                            onChange={handleChange}
                        >{video.description}</textarea>

                    </div>

                    {
                        msg && (
                            <h5 className='errorMessage'>{msg}</h5>
                        )
                    }


                    <div className="cancel_save">
                        <button className="btn btn-border cancel-btn" onClick={hide}>Cancel</button>

                        <button className="btn btn-filled" onClick={()=>{edit?editVideo(hide):addVideo(hide)}}>{edit?"Update":"Add"}</button>
                    </div>
                </>
            )}
        </Popup>
    )
}

export default AddEditVideo
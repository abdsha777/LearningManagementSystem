import React, { useEffect, useState } from 'react'
import './StudentVideo.css'

function StudentVideo() {
    const [video,setVideo]=useState([]);
    const getVideoList=()=>{
        fetch("http://localhost:7000/video_details")
        .then(response=>response.json())
        .then(data=>setVideo(data[0]))
        .catch(error=>alert(error))
    }
    useEffect(()=>{
        getVideoList();
    },[]);
    return (

        <div className='student-video-page'>
            <div className="video-info1">

                <h4 id="video-no">Video No:</h4>
                <p>{video.no}</p>
                <h4>Video Name:</h4>
                <p>{video.name}</p>
                <h4>Status:</h4>
                <p>{video.status}</p>
            </div>
            <div className="video">
                <iframe src={video.link}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>
            </div>

            <div className="video-desc">
                <h4> Description: </h4>
                <p> {video.description}
                </p>
            </div>
            
            <div className="video-btns">
                <button className="btn btn-border cancel-btn">Previous</button>

                <button className="btn btn-filled">Next</button>
            </div>
        </div>
    )
}

export default StudentVideo

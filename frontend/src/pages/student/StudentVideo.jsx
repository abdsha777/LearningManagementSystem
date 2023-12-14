import React, { useContext, useEffect, useState } from "react";
import "./StudentVideo.css";
import Accordian from "../../components/accordian/Accordian";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function StudentVideo() {
    const backend = import.meta.env.VITE_BACKEND;
    const { token } = useContext(AuthContext);
    const { course: id, videoId } = useParams();
    const [video,setVideo] = useState(null);
    const nav = useNavigate();

    const [course, setCourse] = useState(null);

    function getCourseData() {
        fetch(backend + "/api/course/detail/" + id, { headers: { token } })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setCourse(data);
                data.units.map(u=>{
                    u.videos.map(v=>{
                        if(v._id==videoId){
                            setVideo(v)
                        }
                    })
                })
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCourseData();
    }, [videoId]);

    

    if (!course) {
        return (
            <div className="teacher-view-course">
                <h1 className="title">Loading...</h1>
            </div>
        );
    }
    return (
        <div className="studentVideo">
            <div className="backlink">
                <a onClick={() => nav(-1)}>&larr; back</a>
            </div>
            <h1 className="title">{video.title}</h1>
            <h4 className="description">
                {video.description}
            </h4>
            <div className="course-content">
                <div className="left-content">
                    {video&&(
                        <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        ></iframe>
                    )}
                </div>
                <div className="right-content"> 
                    <Accordian data={course.units} isEnrolled={course.isEnrolled} side courseId={course._id} />
                </div>
            </div>
        </div>
    );
}
export default StudentVideo;

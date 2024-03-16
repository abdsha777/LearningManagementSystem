import React, { useContext, useEffect, useState } from "react";
import "./StudentVideo.css";
import Accordian from "../../components/accordian/Accordian";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function StudentVideo() {
    const backend = import.meta.env.VITE_BACKEND;
    const { token } = useContext(AuthContext);
    const { course: id, videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const nav = useNavigate();

    const [course, setCourse] = useState(null);

    const [nextLocked, setNextLocked] = useState(true);

    function setVideos(data) {
        let prevVideo = null;
        let currentVideo = null;
        let nextVideo = null;

        for (let i = 0; i < data.units.length; i++) {
            if (currentVideo) break;
            for (let j = 0; j < data.units[i].videos.length; j++) {
                const v = data.units[i].videos[j];

                if (v._id === videoId) {
                    currentVideo = v;

                    // Set next video if available
                    if (
                        j == data.units[i].videos.length - 1 &&
                        i < data.units.length - 1
                    ) {
                        // console.log("get from next");
                        nextVideo = data.units[i + 1].videos[0];
                    }
                    if (j < data.units[i].videos.length - 1) {
                        nextVideo = data.units[i].videos[j + 1];
                    }
                    break;
                } else {
                    prevVideo = v;
                    // console.log(i, j);
                }
            }
        }

        setVideo(currentVideo);
        setPrev(prevVideo);
        setNext(nextVideo);
        setNextLocked(nextVideo.locked);

        startVideo(currentVideo);
        // console.log(prevVideo, currentVideo, nextVideo);
    }

    function getCourseData() {
        fetch(backend + "/api/course/detail/" + id, { headers: { token } })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setCourse(data);
                setVideos(data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            getCourseData();
        }
        return () => {
            ignore = false;
        };
    }, [videoId]);

    async function startVideo(data) {
        try {
            let res = await fetch(backend + "/api/video/start/", {
                method: "POST",
                headers: {
                    token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ videoId }),
            });
            let data2 = await res.json();
            // console.log(res);
            if (res.ok) {
                // console.log(data);
                let totalDuration = 0;
                totalDuration += data.duration.hours
                    ? data.duration.hours * 3600
                    : 0;
                totalDuration += data.duration.minutes
                    ? data.duration.minutes * 60
                    : 0;
                totalDuration = totalDuration * 1000 * 0.05;
                // console.log(totalDuration);
                setTimeout(() => {
                    checkVideo();
                }, totalDuration);
            } else {
                nav("/courseDetail/" + id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function checkVideo() {
        try {
            let res = await fetch(backend + "/api/video/check/", {
                method: "POST",
                headers: {
                    token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ videoId }),
            });
            // console.log(res);
            if (res.ok) {
                setNextLocked(false);
            } else {
                setTimeout(() => {
                    checkVideo();
                }, 10000);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            <h3>{video.title}</h3>
            <h4 className="description">{video.description}</h4>
            <div className="course-content">
                <div className="left-content">
                    {video && (
                        <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            onClick={startVideo}
                        ></iframe>
                    )}
                    <div className="videoBtns">
                        {prev && (
                            <Link
                                to={`/courseDetail/${id}/video/${prev._id}`}
                                className="prev"
                            >
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="22"
                                        viewBox="0 0 13 22"
                                        fill="none"
                                    >
                                        <path
                                            d="M11.1678 21.6658L12.9996 19.8983L3.60468 10.8327L13 1.76747L11.1683 -4.02022e-05L0.000273415 10.8326L11.1678 21.6658Z"
                                            fill="white"
                                        />
                                    </svg>
                                    Previous
                                </button>
                            </Link>
                        )}
                        {next && !nextLocked && (
                            <Link
                                to={`/courseDetail/${id}/video/${next._id}`}
                                className="next"
                            >
                                <button>
                                    Next
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="22"
                                        viewBox="0 0 13 22"
                                        fill="none"
                                    >
                                        <path
                                            d="M1.83175 0.334185L-8.69784e-07 2.10166L9.39508 11.1671L-7.72588e-08 20.2325L1.83175 22L12.9995 11.1671L1.83175 0.334185Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="right-content">
                    <Accordian
                        data={course.units}
                        isEnrolled={course.isEnrolled}
                        side
                        courseId={course._id}
                    />
                </div>
            </div>
        </div>
    );
}
export default StudentVideo;

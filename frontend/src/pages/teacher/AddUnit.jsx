import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AddEditVideo from "../../components/popups/AddEditVideo";
import ChangeSequence from "../../components/popups/ChangeSequence";

function AddUnit() {
    const endpoint = import.meta.env.VITE_BACKEND;
    const nav = useNavigate();
    const { id, unitId } = useParams();
    const [unit, setUnit] = useState({ courseId: id });
    const [videos, setVideos] = useState([]);
    const [msg, setMsg] = useState(null);
    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setUnit({
            ...unit,
            [e.target.name]: e.target.value,
        });
    };

    async function createUnit() {
        if (!unit.title) {
            setMsg("Enter title");
            return;
        }
        if (!unit.duration) {
            setMsg("Enter duration");
            return;
        }
        if (!unit.description) {
            setMsg("Enter description");
            return;
        }

        const res = await fetch(endpoint + "/api/unit/create", {
            method: "POST",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify(unit),
        });
        const data = await res.json();

        if (res.ok) {
            // console.log(data);
            nav(-1);
        } else {
            setMsg("Invalid Data");
            console.log(data);
        }
    }

    function getUnit() {
        fetch(endpoint + "/api/unit/get/" + unitId, {
            headers: { token },
        })
            .then((res) => res.json())
            .then((data) => {
                setUnit(data);
                console.log(data);
            })
            .catch((err) => nav("/mycourse"));
    }

    function getVideos() {
        fetch(endpoint + "/api/video/get/" + unitId, {
            headers: { token },
        })
            .then((res) => res.json())
            .then((data) => setVideos(data))
            .catch((err) => nav("/mycourse"));
    }

    async function updateUnit() {
        if (!unit.title) {
            setMsg("Enter title");
            return;
        }
        if (!unit.duration) {
            setMsg("Enter duration");
            return;
        }
        if (!unit.description) {
            setMsg("Enter description");
            return;
        }

        const res = await fetch(endpoint + "/api/unit/update/" + unitId, {
            method: "PUT",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify(unit),
        });
        const data = await res.json();

        if (res.ok) {
            // console.log(data);
            nav(-1);
        } else {
            setMsg("Invalid Data");
            console.log(data);
        }
    }

    useEffect(() => {
        if (unitId) {
            getUnit();
            getVideos();
        }
    }, []);

    function deleteVideo(id) {
        if (!window.confirm("Are You sure?")) {
            return;
        }
        // console.log(id)
        fetch(`${endpoint}/api/video/delete/${id}`, {
            method: "DELETE",
            headers: { token },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                getVideos();
            });
    }

    return (
        <>
            <div className="backlink">
                <a onClick={() => nav(-1)}>&larr; back</a>
            </div>

            <div>
                <div className="input-box">
                    <label htmlFor="cname">Unit Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Name"
                        name="title"
                        value={unit.title || ""}
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
                        value={unit.duration || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="desc">
                        Description <small>About the unit</small>
                    </label>
                    <textarea
                        placeholder="Enter Description"
                        name="description"
                        value={unit.description || ""}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {msg && <h4 className="errorMessage">{msg}</h4>}

                <div className="cancel_save">
                    <button className="btn btn-border cancel-btn">
                        Cancel
                    </button>

                    <button
                        className="btn btn-filled"
                        onClick={unitId ? updateUnit : createUnit}
                    >
                        Save
                    </button>
                </div>
            </div>
            {unitId && (
                <>
                    <div className="sectionBody">
                        <h4 className="sectionHeading">Videos</h4>

                        {videos
                            .sort((a, b) => {
                                return a.sequence < b.sequence ? -1 : 1;
                            })
                            .map((v, idx) => (
                                <div className="sectionBox" key={idx}>
                                    <div className="textbox">
                                        <h5>Sequence:</h5>
                                        <p>{v.sequence}</p>
                                    </div>
                                    <div className="textbox">
                                        <h5>Title:</h5>
                                        <p>{v.title}</p>
                                    </div>
                                    <div className="textbox">
                                        <h5>Duration:</h5>
                                        <p>
                                            {v.duration && v.duration.hours > 0
                                                ? `${v.duration.hours} hours`
                                                : ""}{" "}
                                            {v.duration?.minutes} min
                                        </p>
                                    </div>
                                    <div className="textbox">
                                        <h5>Description:</h5>
                                        <p>{v.description}</p>
                                    </div>
                                    <div className="textbox">
                                        <h5>YouTube Link:</h5>
                                        <a href={v.url} target="_blank">
                                            {v.url}
                                        </a>
                                    </div>

                                    <div className="sectionBtns">
                                        <AddEditVideo
                                            handler={
                                                <button className="editBtn">
                                                    <svg
                                                        width="35"
                                                        height="35"
                                                        viewBox="0 0 35 35"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M28.4375 17.5C28.4375 17.2099 28.5527 16.9317 28.7579 16.7266C28.963 16.5215 29.2412 16.4062 29.5312 16.4062C29.8213 16.4062 30.0995 16.5215 30.3046 16.7266C30.5098 16.9317 30.625 17.2099 30.625 17.5V29.5312C30.625 29.8213 30.5098 30.0995 30.3046 30.3046C30.0995 30.5098 29.8213 30.625 29.5312 30.625H5.46875C5.17867 30.625 4.90047 30.5098 4.69535 30.3046C4.49023 30.0995 4.375 29.8213 4.375 29.5312V5.46875C4.375 5.17867 4.49023 4.90047 4.69535 4.69535C4.90047 4.49023 5.17867 4.375 5.46875 4.375H17.5C17.7901 4.375 18.0683 4.49023 18.2734 4.69535C18.4785 4.90047 18.5938 5.17867 18.5938 5.46875C18.5938 5.75883 18.4785 6.03703 18.2734 6.24215C18.0683 6.44727 17.7901 6.5625 17.5 6.5625H6.5625V28.4375H28.4375V17.5Z"
                                                            fill="black"
                                                        />
                                                        <path
                                                            d="M16.063 18.9439L17.8677 18.6857L28.954 7.60168C29.0584 7.50079 29.1417 7.3801 29.1991 7.24666C29.2564 7.11321 29.2866 6.96969 29.2878 6.82446C29.2891 6.67924 29.2614 6.53521 29.2064 6.40079C29.1514 6.26638 29.0702 6.14426 28.9675 6.04156C28.8648 5.93887 28.7427 5.85765 28.6083 5.80266C28.4739 5.74766 28.3298 5.71999 28.1846 5.72125C28.0394 5.72251 27.8959 5.75269 27.7624 5.81001C27.629 5.86733 27.5083 5.95066 27.4074 6.05512L16.319 17.1392L16.0608 18.9439H16.063ZM30.5005 4.50637C30.8054 4.81109 31.0473 5.1729 31.2124 5.57114C31.3774 5.96938 31.4623 6.39623 31.4623 6.82731C31.4623 7.25838 31.3774 7.68524 31.2124 8.08347C31.0473 8.48171 30.8054 8.84353 30.5005 9.14824L19.1583 20.4904C18.9911 20.6583 18.7738 20.7673 18.5393 20.8011L14.9299 21.3173C14.7617 21.3415 14.5902 21.3261 14.4289 21.2724C14.2677 21.2187 14.1212 21.1282 14.001 21.0081C13.8809 20.8879 13.7903 20.7414 13.7367 20.5802C13.683 20.4189 13.6676 20.2474 13.6918 20.0792L14.208 16.4698C14.2412 16.2355 14.3494 16.0183 14.5165 15.8507L25.8608 4.50856C26.4762 3.89342 27.3106 3.54785 28.1807 3.54785C29.0507 3.54785 29.8852 3.89342 30.5005 4.50856V4.50637Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                    Edit
                                                </button>
                                            }
                                            edit={true}
                                            token={token}
                                            unitId={unitId}
                                            refresh={getVideos}
                                            data={v}
                                        />

                                        <button
                                            className="editBtn deleteBtn"
                                            onClick={() => deleteVideo(v._id)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="27"
                                                viewBox="0 0 25 27"
                                                fill="none"
                                            >
                                                <path
                                                    d="M5.20801 26.625C4.40592 26.625 3.71905 26.3392 3.14738 25.7675C2.57572 25.1958 2.29037 24.5094 2.29134 23.7083V4.75H0.833008V1.83333H8.12467V0.375H16.8747V1.83333H24.1663V4.75H22.708V23.7083C22.708 24.5104 22.4222 25.1973 21.8505 25.769C21.2788 26.3406 20.5925 26.626 19.7913 26.625H5.20801ZM19.7913 4.75H5.20801V23.7083H19.7913V4.75ZM8.12467 20.7917H11.0413V7.66667H8.12467V20.7917ZM13.958 20.7917H16.8747V7.66667H13.958V20.7917Z"
                                                    fill="black"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                        <AddEditVideo
                            handler={
                                <button className="mybutton dashedBtn mr20">
                                    Add Videos
                                </button>
                            }
                            edit={false}
                            token={token}
                            unitId={unitId}
                            refresh={getVideos}
                        />

                        {videos && (
                            <ChangeSequence
                                handler={
                                    <button className="mybutton filledBtn">
                                        Change Sequence
                                    </button>
                                }
                                data={videos}
                                token={token}
                                refresh={getVideos}
                            />
                        )}
                    </div>

                    <div className="sectionBody">
                        <h4 className="sectionHeading">Test</h4>
                        {unit.numberOfQuestion <= 0 ? (
                            <Link to={"test"}>
                                <button className="mybutton dashedBtn mr20">
                                    Add Test
                                </button>
                            </Link>
                        ) : (
                            <div className="sectionBox">
                                <div className="textbox">
                                    <h3>No of question:</h3>
                                    <p>{unit.numberOfQuestion}</p>
                                </div>

                                <Link to="test">
                                    <button className="editBtn">
                                        <svg
                                            width="35"
                                            height="35"
                                            viewBox="0 0 35 35"
                                            fill="none"
                                        >
                                            <path
                                                d="M28.4375 17.5C28.4375 17.2099 28.5527 16.9317 28.7579 16.7266C28.963 16.5215 29.2412 16.4062 29.5312 16.4062C29.8213 16.4062 30.0995 16.5215 30.3046 16.7266C30.5098 16.9317 30.625 17.2099 30.625 17.5V29.5312C30.625 29.8213 30.5098 30.0995 30.3046 30.3046C30.0995 30.5098 29.8213 30.625 29.5312 30.625H5.46875C5.17867 30.625 4.90047 30.5098 4.69535 30.3046C4.49023 30.0995 4.375 29.8213 4.375 29.5312V5.46875C4.375 5.17867 4.49023 4.90047 4.69535 4.69535C4.90047 4.49023 5.17867 4.375 5.46875 4.375H17.5C17.7901 4.375 18.0683 4.49023 18.2734 4.69535C18.4785 4.90047 18.5938 5.17867 18.5938 5.46875C18.5938 5.75883 18.4785 6.03703 18.2734 6.24215C18.0683 6.44727 17.7901 6.5625 17.5 6.5625H6.5625V28.4375H28.4375V17.5Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M16.063 18.9439L17.8677 18.6857L28.954 7.60168C29.0584 7.50079 29.1417 7.3801 29.1991 7.24666C29.2564 7.11321 29.2866 6.96969 29.2878 6.82446C29.2891 6.67924 29.2614 6.53521 29.2064 6.40079C29.1514 6.26638 29.0702 6.14426 28.9675 6.04156C28.8648 5.93887 28.7427 5.85765 28.6083 5.80266C28.4739 5.74766 28.3298 5.71999 28.1846 5.72125C28.0394 5.72251 27.8959 5.75269 27.7624 5.81001C27.629 5.86733 27.5083 5.95066 27.4074 6.05512L16.319 17.1392L16.0608 18.9439H16.063ZM30.5005 4.50637C30.8054 4.81109 31.0473 5.1729 31.2124 5.57114C31.3774 5.96938 31.4623 6.39623 31.4623 6.82731C31.4623 7.25838 31.3774 7.68524 31.2124 8.08347C31.0473 8.48171 30.8054 8.84353 30.5005 9.14824L19.1583 20.4904C18.9911 20.6583 18.7738 20.7673 18.5393 20.8011L14.9299 21.3173C14.7617 21.3415 14.5902 21.3261 14.4289 21.2724C14.2677 21.2187 14.1212 21.1282 14.001 21.0081C13.8809 20.8879 13.7903 20.7414 13.7367 20.5802C13.683 20.4189 13.6676 20.2474 13.6918 20.0792L14.208 16.4698C14.2412 16.2355 14.3494 16.0183 14.5165 15.8507L25.8608 4.50856C26.4762 3.89342 27.3106 3.54785 28.1807 3.54785C29.0507 3.54785 29.8852 3.89342 30.5005 4.50856V4.50637Z"
                                                fill="black"
                                            />
                                        </svg>
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default AddUnit;

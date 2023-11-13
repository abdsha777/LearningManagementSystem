import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AddUnit() {
    const endpoint = "http://localhost:5000";
    const nav = useNavigate();
    const { id } = useParams();
    const [unit, setUnit] = useState({ courseId:id })
    const [msg, setMsg] = useState(null);
    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setUnit({
            ...unit,
            [e.target.name]: e.target.value,
        });
    };

    async function createUnit() {
        console.log(JSON.stringify(unit))
        if (!unit.title) {
            setMsg("Enter title");
            return
        }
        if (!unit.duration) {
            setMsg("Enter duration");
            return
        }
        if (!unit.description) {
            setMsg("Enter description");
            return
        }

        const res = await fetch(endpoint + "/api/unit/create", {
            method: 'POST',
            headers: { token, 'Content-Type':'application/json' },
            body: JSON.stringify(unit)
        })
        const data = await res.json()

        if (res.ok) {
            console.log(data);
            nav(-1);
        } else {
            setMsg("Invalid Data")
            console.log(data);
        }
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

                {
                    msg && (
                        <h2 className='errorMessage'>{msg}</h2>
                    )
                }

                <div className="cancel_save">
                    <button className="btn btn-border cancel-btn">Cancel</button>

                    <button className="btn btn-filled" onClick={createUnit}>Save</button>
                </div>
            </div>
        </>
    );
}

export default AddUnit;

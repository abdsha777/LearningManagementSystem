import React, { useContext, useEffect, useState } from "react";
import Popup from "./MyPopup";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AddEditQuestion({ handler, data, token, refresh, edit, final }) {
    const endpoint = import.meta.env.VITE_BACKEND;
    const [msg, setMsg] = useState(null);
    const nav = useNavigate();

    const { id, unitId } = useParams();

    const [question, setQuestion] = useState(null);
    const [option1, setOption1] = useState(null);
    const [option2, setOption2] = useState(null);
    const [option3, setOption3] = useState(null);
    const [option4, setOption4] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [mcqId, setMcqId] = useState(null);

    useEffect(() => {
        if (edit) {
            setMcqId(data._id)
            setQuestion(data.question);
            setOption1(data.options[0]);
            setOption2(data.options[1]);
            setOption3(data.options[2]);
            setOption4(data.options[3]);
            setAnswer(data.answer);
            setAnswer(
                data.answer == null
                    ? "-"
                    : data.answer == option1
                    ? "a"
                    : data.answer == option2
                    ? "b"
                    : data.answer == option3
                    ? "c"
                    : "d");
        }
    }, []);

    function validate() {
        if (
            !option1 ||
            !option2 ||
            !option3 ||
            !option4 ||
            !question ||
            !answer ||
            answer == "-"
        ) {
            setMsg("Fill all the fields");
            return false;
        } else {
            setMsg(null);
            return true;
        }
    }

    async function addFirstMcq(hide) {
        if (validate()) {
            let body = {
                question,
                options: [option1, option2, option3, option4],
                answer:
                    answer == "a"
                        ? option1
                        : answer == "b"
                        ? option2
                        : answer == "c"
                        ? option3
                        : option4,
                final: final,
                courseId: id,
                unitId
            };
            // console.log(body);
            let api = unitId?endpoint + "/api/test/addmcq":endpoint + "/api/test/final/addmcq";
            var res = await fetch(api, {
                method: "POST",
                headers: { token, "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            var data = await res.json();
            if (!res.ok) {
                // console.log(data);
                setMsg(data.error);
            } else {
                setQuestion(null);
                setOption1(null);
                setOption2(null);
                setOption3(null);
                setOption4(null);
                console.log(data);
                setAnswer("-")
                refresh();
                hide();
            }
        }
    }

    async function editMcq(hide) {
        if (validate()) {
            let body = {
                mcqId,
                question,
                options: [option1, option2, option3, option4],
                answer:
                    answer == "a"
                        ? option1
                        : answer == "b"
                        ? option2
                        : answer == "c"
                        ? option3
                        : option4,
                unitId
            };
            console.log(body)
            let api = endpoint + "/api/test/editmcq";

            var res = await fetch(api, {
                method: "PUT",
                headers: { token, "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            var data = await res.json();
            if (!res.ok) {
                // console.log(data);
                setMsg(data.error);
            } else {
                // console.log(data);
                refresh();
                hide();
            }
        }
    }

    return (
        <Popup handler={handler}>
            {({ hide }) => (
                <>
                    <h3>{edit ? "Edit" : "Add"} Question</h3>
                    <div className="input-box">
                        <label htmlFor="cname">Question</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Question...?"
                            name="question"
                            value={question || ""}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="cname">Options</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="option"
                            value={option1 || ""}
                            onChange={(e) => setOption1(e.target.value)}
                        />
                        <input
                            type="text"
                            id="title"
                            placeholder="option"
                            value={option2 || ""}
                            onChange={(e) => setOption2(e.target.value)}
                        />
                        <input
                            type="text"
                            id="title"
                            placeholder="option"
                            value={option3 || ""}
                            onChange={(e) => setOption3(e.target.value)}
                        />
                        <input
                            type="text"
                            id="title"
                            placeholder="option"
                            value={option4 || ""}
                            onChange={(e) => setOption4(e.target.value)}
                        />
                    </div>
                    {!option1 || !option2 || !option3 || !option4 ? (
                        ""
                    ) : (
                        <div className="input-box">
                            <label htmlFor="cname">Answer</label>
                            <select
                                name=""
                                id=""
                                value={answer||""}
                                onChange={(e) => setAnswer(e.target.value)}
                            >
                                <option value="-">---</option>
                                <option value="a">{option1}</option>
                                <option value="b">{option2}</option>
                                <option value="c">{option3}</option>
                                <option value="d">{option4}</option>
                            </select>
                        </div>
                    )}

                    {msg && <h2 className="errorMessage">{msg}</h2>}

                    <div className="cancel_save">
                        <button
                            className="btn btn-border cancel-btn"
                            onClick={hide}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-filled"
                            onClick={() => {
                                edit ? editMcq(hide) : addFirstMcq(hide);
                            }}
                        >
                            {edit ? "Update" : "Add"}
                        </button>
                    </div>
                </>
            )}
        </Popup>
    );
}

export default AddEditQuestion;

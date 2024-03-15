import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddEditQuestion from "../../components/popups/AddEditQuestion";
import AuthContext from "../../context/AuthContext";

function AddTest() {
    const endpoint = import.meta.env.VITE_BACKEND;
    const { id,unitId } = useParams();
    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    const [mcqs, setMcqs] = useState([]);

    function getMCQs() {
        if(!unitId){
            fetch(endpoint + "/api/test/final/get/" + id, { headers: { token } })
            .then((res) => res.json())
            .then((data) => setMcqs(data));
        }else{
            fetch(endpoint + "/api/test/get/" + unitId, { headers: { token } })
            .then((res) => res.json())
            .then((data) => setMcqs(data));
        }
    }

    useEffect(() => {
        getMCQs();
    }, []);

    return (
        <>
            <div className="backlink">
                <a onClick={() => nav(-1)}>&larr; back</a>
            </div>
            <div className="sectionBody">
                <h3 className="sectionHeading">{unitId?"":"Final"} Test Questions</h3>
                {mcqs.map((m) => (
                    <div className="sectionBox" key={m._id}>
                        <div className="textbox">
                            <h5>Question:</h5>
                            <p>{m.question}</p>
                        </div>
                        <div className="textbox">
                            <h5>Options:</h5>
                            <ul className="ul">
                                {m.options.map((o, idx) => (
                                    <li key={idx}>{o}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="textbox">
                            <h5>Answer:</h5>
                            <p>{m.answer}</p>
                        </div>
                        <AddEditQuestion
                            edit={true}
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
                            data={m}
                            token={token}
                            refresh={getMCQs}
                        />
                    </div>
                ))}

                <AddEditQuestion
                    handler={
                        <button className="mybutton dashedBtn mr20">
                            Add Question
                        </button>
                    }
                    final={true}
                    refresh={getMCQs}
                    token={token}
                />
            </div>
            <button className="mybutton filledBtn full">Save</button>
        </>
    );
}

export default AddTest;

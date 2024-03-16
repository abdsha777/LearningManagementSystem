import React, { useContext, useEffect, useState } from "react";
import Popup from "./MyPopup";

function ChangeSequence({ handler, data, token, refresh, unit }) {
    const [units, setUnits] = useState([]);

    useEffect(() => {
        setUnits(data.map(d => ({ _id: d._id, title: d.title, sequence: d.sequence })));
    }, [data]);
    
    function up(seq){
        // to reduce the sequence
        if(seq==1){
            // console.log('wrong')
            return
        }
        setUnits([...units.map(u=>{
            if(u.sequence==seq){
                // console.log(u,"from")
                u.sequence-=1;
            }
            else if(u.sequence==seq-1){
                // console.log(u)
                u.sequence+=1;
            }
            return u;
        })])
    }
    function down(seq){
        if(seq==units.length){
            // console.log('wrong2')
            return
        }
        setUnits([...units.map(u=>{
            if(u.sequence==seq){
                // console.log(u,"from")
                u.sequence+=1;
            }
            else if(u.sequence==seq+1){
                // console.log(u)
                u.sequence-=1;
            }
            return u;
        })])
    }

    async function saveSequence(hide){
        // console.log(units)
        const endpoint = import.meta.env.VITE_BACKEND;
        const res = await fetch( unit?endpoint+"/api/course/unitsequence/":endpoint+"/api/course/videosequence/",{
            headers:{
                token,
                "Content-Type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify({units})
        }) 
        const data = await res.json()
        // console.log(data)
        if(res.ok){
            refresh();
            hide();
        }
    }

    return (
        <Popup handler={handler}>
            {({ hide }) => (
                <>
                    <h3>Change Sequence</h3>

                    <div className="units">

                        {
                            units
                            .sort((a,b)=>{
                                return a.sequence<b.sequence?-1:1
                            })
                            .map((u,idx)=>(
                                <div className="unit" key={idx}>
                                    <p>{u.sequence}. {u.title.length>12?u.title.substring(0,12)+"..":u.title}</p>
                                    <div className="sequenceBtn">
                                        <svg
                                            onClick={()=>{up(u.sequence)}}
                                            className="up"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="21"
                                            viewBox="0 0 24 21"
                                            fill="none"
                                        >
                                            <path
                                                d="M11.4475 0.558047C11.8293 -0.123815 12.8107 -0.123816 13.1925 0.558047L23.8064 19.5114C24.1797 20.178 23.6979 21 22.9339 21H1.70612C0.942138 21 0.460332 20.178 0.833618 19.5114L11.4475 0.558047Z"
                                                fill="#3FF3FF"
                                            />
                                        </svg>

                                        <svg
                                            onClick={()=>{down(u.sequence)}}
                                            className="down"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="21"
                                            viewBox="0 0 24 21"
                                            fill="none"
                                        >
                                            <path
                                                d="M13.1922 20.442C12.8103 21.1238 11.829 21.1238 11.4471 20.442L0.833267 1.48861C0.459982 0.822025 0.941789 2.936e-06 1.70577 2.86921e-06L22.9335 1.01342e-06C23.6975 9.46632e-07 24.1793 0.822023 23.806 1.4886L13.1922 20.442Z"
                                                fill="#3FF3FF"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }

                        
                    </div>

                    <div className="cancel_save">
                        <button
                            className="btn btn-border cancel-btn"
                            onClick={hide}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-filled"
                            onClick={()=>{saveSequence(hide)}}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
        </Popup>
    );
}

export default ChangeSequence;

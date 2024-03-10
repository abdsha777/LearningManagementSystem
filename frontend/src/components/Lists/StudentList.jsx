import React, { useContext, useEffect, useState } from 'react'
import './StudentList.css'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import defaultUser from "../../assets/user.jpg";

function StudentList({teacher}) {
    const [students, setStudents] = useState([]);
    const [classFilter, setClassFilter] = useState("");
    const [classFilters,setClassFilters]=useState([]);
    const [statusFilter,setStatusFilter]=useState("");
    const [q,setQ]=useState("");
    // const endpoint = "http://localhost:7000/Admin_Teacher_student";
    const backend = import.meta.env.VITE_BACKEND;
    var endpoint = `${backend}/api/users/students/`;
    if(teacher){
        endpoint = `${backend}/api/users/mystudents/`;
    }
    const {token} = useContext(AuthContext)

    function getStudents() {
        fetch(endpoint,{headers:{token:token}})
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setClassFilters([...new Set(data.map(s=>s.class))]);
            })
    }

    function filterList(e){
        setClassFilter(e.target.value);
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
        <div className='studentListNew'>
            <div className="listHeading">
                <h3>STUDENT LIST</h3>
                <Link to={'add'}><button>+ Add Student</button></Link>
            </div>
            <div className="searchSection">
                <input type="text" name="query" placeholder='Search by name...' onChange={(e)=>setQ(e.target.value)} />
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                        <path d="M20.2889 22.5L12.5889 14.625C11.9778 15.125 11.275 15.5208 10.4806 15.8125C9.68611 16.1042 8.84074 16.25 7.94444 16.25C5.72407 16.25 3.84511 15.4633 2.30756 13.89C0.77 12.3167 0.000814815 10.395 0 8.125C0 5.85417 0.769185 3.9325 2.30756 2.36C3.84593 0.7875 5.72489 0.000833333 7.94444 0C10.1648 0 12.0438 0.786667 13.5813 2.36C15.1189 3.93333 15.8881 5.855 15.8889 8.125C15.8889 9.04167 15.7463 9.90625 15.4611 10.7188C15.1759 11.5312 14.7889 12.25 14.3 12.875L22 20.75L20.2889 22.5ZM7.94444 13.75C9.47222 13.75 10.771 13.2029 11.8409 12.1088C12.9107 11.0146 13.4453 9.68667 13.4444 8.125C13.4444 6.5625 12.9095 5.23417 11.8397 4.14C10.7698 3.04583 9.47141 2.49917 7.94444 2.5C6.41667 2.5 5.11785 3.04708 4.048 4.14125C2.97815 5.23542 2.44363 6.56333 2.44444 8.125C2.44444 9.6875 2.97937 11.0158 4.04922 12.11C5.11907 13.2042 6.41748 13.7508 7.94444 13.75Z" fill="#555555" />
                    </svg>
                    Search
                </button>
            </div>
            <section className="listSection">

                <div className="filterBox">
                    <div className="filterHead">
                        <h4>Filter</h4>
                    </div>
                    <div className="filterBody">
                        <div className="filter">
                            <div className="filterInfo">
                                <h4>Class</h4>
                                <button onClick={()=>setClassFilter("")}>Reset</button>
                            </div>
                            <select className='filterDropDown' name="class" defaultValue={null} onChange={filterList}>
                                <option value="">---</option>
                                {
                                    classFilters.map((f,idx)=>(
                                        <option key={idx} value={f}>{f}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="filter">
                            <div className="filterInfo">
                                <h4>Status</h4>
                                <button onClick={()=>setStatusFilter("")}>Reset</button>
                            </div>
                            <select className='filterDropDown' name="class" defaultValue={null}
                                onChange={(e)=>setStatusFilter(e.target.value)}
                            >
                                <option value="">---</option>
                                <option value="true">Active</option>
                                <option value="false">Deactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="filterBottom">
                        <button>Reset</button>
                        <button className='apply'>Apply</button>
                    </div>
                </div>

                <div className="listBox">
                    <table className='listTable'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Enrolled</th>
                                <th>Completed</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students
                                .filter(s=>{
                                    return q==""? true : s.name.toLowerCase().includes(q.toLowerCase())
                                })
                                .filter(s=>{
                                    return statusFilter==""? true : statusFilter==s.active+""
                                })
                                .filter(s=>{
                                    return classFilter==""?true: classFilter==s.class
                                }).map((s) => {
                                    let id = s.id;
                                    // console.log(s)
                                    return (
                                        <tr key={id}>
                                            <td><input type="checkbox" /></td>
                                            <td>
                                                <div className="studentDetails">
                                                    <div className="img">
                                                        <img src={s.profilePicture||defaultUser} alt="" />
                                                    </div>
                                                    <div className="studentInfo">
                                                        <small>{id.slice(-5)}</small>
                                                        <h3>{s.name.length>16?s.name.substring(0,15)+"..":s.name}</h3>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{s.class}</td>
                                            <td>{s.totalEnrolled}</td>
                                            <td>{s.totalCompleted}</td>
                                            <td><div className={s.active?"status":"status deactive"}></div></td>
                                            <td>
                                                <Link to={"update/"+s.id}>
                                                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none">
                                                        <path d="M6.79175 23.9373L13.5951 23.9135L28.4445 8.80851C29.0272 8.21001 29.3479 7.41518 29.3479 6.56968C29.3479 5.72418 29.0272 4.92934 28.4445 4.33084L25.9994 1.81967C24.8339 0.622675 22.8004 0.629008 21.6442 1.81492L6.79175 16.9231V23.9373ZM23.8195 4.05851L26.2692 6.56493L23.8071 9.06976L21.362 6.56018L23.8195 4.05851ZM9.87508 18.2436L19.1713 8.78634L21.6164 11.2975L12.3217 20.7516L9.87508 20.7595V18.2436Z" fill="#1E1E1E" />
                                                        <path d="M3.70833 30.25H25.2917C26.9921 30.25 28.375 28.8298 28.375 27.0833V13.359L25.2917 16.5257V27.0833H8.57692C8.53683 27.0833 8.49521 27.0992 8.45513 27.0992C8.40425 27.0992 8.35337 27.0849 8.30096 27.0833H3.70833V4.91667H14.2641L17.3475 1.75H3.70833C2.00787 1.75 0.625 3.17025 0.625 4.91667V27.0833C0.625 28.8298 2.00787 30.25 3.70833 30.25Z" fill="#1E1E1E" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>

                    <div className="listBulkActions">
                        <div>
                            <input type="checkbox" name="selectAll" id='selectAll' />
                            <label htmlFor="selectAll">Select ALL</label>
                        </div>

                        <button className='activate'>Activate</button>
                        <button className='deactivate'>Deactivate</button>
                        <button className='bulkApply'>Apply</button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default StudentList;
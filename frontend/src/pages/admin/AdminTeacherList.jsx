import React, { useState, useEffect, useContext } from "react";
import './AdminTeacherList.css';
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AdminTeacherList() {
  const backend = import.meta.env.VITE_BACKEND;

  const [teacher, setTeacher] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [query, setQuery] = useState("");
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getTeacherList = () => {
    // fetch(`${backend}/api/users/teachers/`, { headers: { token } })
    fetch(`${backend}/api/users/teachers/`, { headers: { token } })
      .then(response => response.json())
      .then(data => { setTeacher(data); setFilteredTeachers(data) })
      .catch(error => console.log(error))
    setLoading(false)
  }
  useEffect(() => {
    getTeacherList();
  }, [])
  useEffect(() => {
    setFilteredTeachers(
      teacher
      .filter((t) => {
        return query == "" ? true : t.name.toLowerCase().includes(query.toLowerCase())
      })
    )
  }, [query])



  // const TeacherSetStatus = () => (
  //   <Popup trigger={<button className="btn btn-filled big">Set Status</button>} modal className="set-status">
  //     {close => (
  //       <div class="set-status">
  //         <div class="pop-up-heading">
  //           <h2>Set Status</h2>
  //           <p>*you can deactive the students who has been left the colloge</p>
  //         </div>
  //         <div class="ss-checkbox">

  //           <div class="c-h">
  //             <label for="sa" class="ch-h">Students Names <small>(Select All)</small></label>
  //             <input type="checkbox" name="sa" id="sa" value="Select All" />
  //           </div>
  //           <div class="c-h-i">
  //             <label for="n2" class="ch-i">Jonny</label>
  //             <input type="checkbox" name="n1" id="n2" value="Select All" />
  //           </div>
  //           <div class="c-h-i">
  //             <label for="n2" class="ch-i">Sebastian</label>
  //             <input type="checkbox" name="n1" id="n2" value="Select All" />
  //           </div>
  //         </div>

  //         <div class="ss_a_a_d">
  //           <div class="rd-a">
  //             <label for="ra1">Active</label>
  //             <input type="radio" name="ra1" id="ra1" value="Active" />
  //           </div>
  //           <div class="rd-a">
  //             <label for="ra2">Deactive</label>
  //             <input type="radio" name="ra1" id="ra2" value="Deactive" />
  //           </div>
  //         </div>
  //         <div class="cancel-save">
  //           <button class="btn btn-border cancel-btn" onClick={close}>Cancel</button>

  //           <button class="btn btn-filled">Save</button>
  //         </div>
  //       </div>
  //     )}
  //   </Popup>
  // );

  return (
    <div className="main_module">
      <h3 className="list-heading">Teachers List</h3>
      <div className="module2">
        <Link to={"add/"} className="btn btn-border-blue">+ Add Teacher</Link>
        <button className="btn btn-border-blue">Bulk Upload</button>
      </div>
      <div className="sub_heading">
        <input type="text" placeholder="Search Students" onChange={(e) => { setQuery(e.target.value) }} />
        {/* <StudentFilter /> */}
        <button className='filterBtn'>Filter</button>
      </div>
      <div className="module2">
        <button className="btn btn-filled big">Set Status</button>
        {/* <TeacherSetStatus /> */}

      </div>
      <div className="listTableContainer">
        {
          loading ? (
            <h1>Loading...</h1>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Teacher Name</th>
                  <th>Department</th>
                  <th>Total No of Course Uploaded</th>
                  <th>Update</th>
                  <th>View</th>
                  <th className="statusBtn">Active</th>
                </tr>
              </thead>
              <tbody>

                {
                  filteredTeachers.map((record, key) => {
                    return (
                      <tr key={key}>
                        <td>{record.name}</td>
                        <td>{record.department}</td>
                        <td>{record.numOfCourse}</td>
                        <td>
                          <Link to={'update/' + record.id}>
                            <button >Update</button>
                          </Link>
                        </td>
                        <td>
                          <button>View</button>
                        </td>
                        <td>
                          <button className={record.active ? "statusBtn" : "statusBtn inactive"}>{record.active ? "Active" : "Inactive"}</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
}

export default AdminTeacherList;

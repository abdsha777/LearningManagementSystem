import React from 'react'
import './AdminStudentList.css'

function AdminStudentList() {
  return (
    <div className="main_module">
      <p className="heading">Students List</p>

      <div className="module2">
        <button className="btn btn-border-blue">+ Add Students</button>
        <button className="btn btn-border-blue">Bulk Upload</button>
      </div>

      <div className="sub_heading">
        <input type="text" placeholder="Search Students" />

        <input type="button" className="filter1" value="Filter >" />
      </div>


      <div className="module2">
        <button className="btn btn-filled big">Set Status</button>
      </div>

      <div className="module5">
        <table>
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
              <th>Faculty</th>
              <th>Year</th>
              <th>Total No of <br /> Enrolled Courses</th>
              <th>Ongoing Course</th>
              <th>Completed Course</th>
              <th>Update</th>
              <th>View</th>
              <th className="status">Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>132601</td>
              <td>Ifat khan</td>
              <td>BCA (SCI)</td>
              <td>TYBCA</td>
              <td>5</td>
              <td>2</td>
              <td>3</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button>View</button>
              </td>
              <td>
                <button className="status">Active</button>
              </td>
            </tr>
            <tr>
              <td>132602</td>
              <td>Ruhi khan</td>
              <td>BCA (SCI)</td>
              <td>TYBCA</td>
              <td>4</td>
              <td>2</td>
              <td>2</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button>View</button>
              </td>
              <td>
                <button className="status">Active</button>
              </td>
            </tr>
            <tr>
              <td>132603</td>
              <td>Shiff khan</td>
              <td>BCA (SCI)</td>
              <td>TYBCA</td>
              <td>3</td>
              <td>1</td>
              <td>2</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button>View</button>
              </td>
              <td>
                <button className="status">Active</button>
              </td>
            </tr>
            <tr>
              <td>132604</td>
              <td>Nilo khan</td>
              <td>BCA (SCI)</td>
              <td>TYBCA</td>
              <td>5</td>
              <td>2</td>
              <td>3</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button>View</button>
              </td>
              <td>
                <button className="status inactive">InActive</button>
              </td>
            </tr>
            <tr>
              <td>132605</td>
              <td>Aaifa khan</td>
              <td>BCA (SCI)</td>
              <td>TYBCA</td>
              <td>5</td>
              <td>2</td>
              <td>3</td>
              <td>
                <button>Update</button>
              </td>
              <td>
                <button>View</button>
              </td>
              <td>
                <button className="status inactive">InActive</button>
              </td>
            </tr>

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default AdminStudentList
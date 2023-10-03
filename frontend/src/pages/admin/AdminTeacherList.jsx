import React from "react";
import './AdminTeacherList.css';

function AdminTeacherList() {
  return (
    <div className="main_module">
      <p className="heading">Teachers List</p>
      <div className="module2">
        <button className="btn btn-border-blue">+ Add Teachers</button>
        <button className="btn btn-border-blue">Bulk Upload</button>
      </div>
      <div className="sub_heading">
        <input type="text" placeholder="Search Students" />
        <button className="filter1">Filter </button>
      </div>
      <div className="module2">
        <button className="btn btn-filled big">Set Status</button>
      </div>
      <div className="module5">
        <table>
          <thead>
            <tr>
              <th>Teacher Id</th>
              <th>Teacher Name</th>
              <th>Faculty</th>
              <th>Total No of Course Uploaded</th>
              <th>Update</th>
              <th>View</th>
              <th className="status">Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>132601</td>
              <td>Kamil khan</td>
              <td>BCA (SCI)</td>
              <td>5</td>
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
              <td>Mohsin Tamboli</td>
              <td>BCA (SCI)</td>
              <td>4</td>
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
              <td>Farzana Nadaf</td>
              <td>BCA (SCI)</td>
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
              <td>132604</td>
              <td>Suhail Sayyed</td>
              <td>BCA (SCI)</td>
              <td>5</td>
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
              <td>Summaiya Tamboli</td>
              <td>BCA (SCI)</td>
              <td>5</td>
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
            {/* Table data */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTeacherList;

import React from "react";

function AdminTeacherList() {
  return (
    <div>
      <header>
        <nav>
          <div className="logo">
            <div className="logo-img"></div>
            <h2>LMS</h2>
          </div>
          <h1 className="greetings">Welcome Kamil Khan</h1>
          <div className="profile">
            <img src={img} alt="sir" />
            <div className="profile-info">
              <h2>Kamil Khan</h2>
              <p>Teacher</p>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="sidebar">
          <a href="#" className="sidebar-links active">
            <svg
              className="home-svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content for Dashboard */}
            </svg>
            Dashboard
          </a>
          <a href="#" className="sidebar-links">
            <svg
              className="course-svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content for My Courses */}
            </svg>
            My Courses
          </a>
          <a href="#" className="sidebar-links">
            <svg
              className="add-svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content for Add New Course */}
            </svg>
            Add New Course
          </a>
          <a href="#" className="sidebar-links">
            <svg
              className="student-svg"
              width="800px"
              height="800px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="3"
              stroke="#000000"
              fill="none"
            >
              {/* SVG content for Student List */}
            </svg>
            Student List
          </a>
          <a href="#" className="sidebar-links">
            <svg
              className="class-svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content for My Course List */}
            </svg>
            My Course List
          </a>
        </div>
        <div>
          AdminTeacherList
          <div className="main_module">
            <p className="heading">Teachers List</p>
            <div className="module2">
              <button className="btn btn-border-blue">+ Add Teachers</button>
              <button className="btn btn-border-blue">Bulk Upload</button>
            </div>
            <div className="sub_heading">
              <input type="text" value="" placeholder="Search Students" />
              <input type="button" className="filter1" value="Filter >" />
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
                      <button class="status">Active</button>
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
                      <button class="status">Active</button>
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
                      <button class="status">Active</button>
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
                      <button class="status inactive">InActive</button>
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
                      <button class="status inactive">InActive</button>
                    </td>
                  </tr>
                  {/* Table data */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminTeacherList;

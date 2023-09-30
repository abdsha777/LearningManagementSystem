import React from "react";
import "./navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <h2>Navigation Menu </h2> <small>check out your code</small>
      <div className="nav-links">
        <Link to={"/teacherCourseDetail"}>Teacher Course Detail</Link>
        <Link to={"/studentDashboard"}>Student Dashboard</Link>
        <Link to={"/studentCourseDetail"}>Student Course Detail</Link>
        <Link to={"/teacherUnitDetail"}>Teacher Unit Detail</Link>
        <Link to={"/StudentUnitDetail"}>Student Unit Detail</Link>
        <Link to={"/teacherViewTest"}>Teacher View Test</Link>
        <Link to={"/studentTest"}>Student View Test</Link>
        <Link to={"/adminDashboard"}>Admin Dashboard</Link>
        <Link to={"/studentVideo"}>Student Video</Link>
        <Link to={"/teacherCourses"}>Teacher My Courses</Link>
        <Link to={"/teacherDashboard"}>Teacher Dashboard</Link>
        <Link to={"/teacherCourseList"}>Teacher Course List</Link>
      </div>
    </div>
  );
}

export default Navigation;

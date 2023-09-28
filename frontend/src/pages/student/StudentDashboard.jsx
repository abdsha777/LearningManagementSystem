import React from 'react'
import './StudentDashboard.css'
import img from "../../assets/image.jpg"

function StudentDashboard() {
    return (
        <div>
            <div className="header-sd">
                <h1 align="left">Overview</h1>
            </div>

            <div className="segg-container">
                <div className="top-card">
                    <div className="col-3">
                        <div className="segg-text">
                            <p>Onging Cource</p>
                            <p>5</p>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="segg-text">
                            <p>Complete Cource</p>
                            <p>6</p>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="segg-text">
                            <p>Certificate Earned</p>
                            <p>3</p>
                        </div>
                    </div>

                </div>
            </div>

            <h1>Courses Your Taking</h1>

            <div className="display-info">
                <table className="row-table " width="100%">

                    <tr>
                        <th>Course Name</th>
                        <th>Module Completed</th>
                        <th>Instructor</th>
                    </tr>

                    <tr>
                        <td>React Js</td>
                        <td>2/10</td>
                        <td>kamil khan</td>
                    </tr>

                    <tr>
                        <td>C++</td>
                        <td>20/10</td>
                        <td>Farzana maam</td>
                    </tr>

                    <tr>
                        <td>Web technology</td>
                        <td>9/10</td>
                        <td>Sumaiya tamboli</td>
                    </tr>
                </table>
            </div>

            <h1>Suggestion</h1>
            <div className="container">
                <div className="card">
                    <div className="col-4">
                        <div className="image">
                            <img src={img}/>
                        </div>
                        <div className="textual">
                            <h2>React js</h2>
                            <p>16 hrs</p>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="image">
                            <img src={img} />
                        </div>
                        <div className="textual">
                            <h2>React js</h2>
                            <p>16 hrs</p>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="image">
                            <img src={img} />
                        </div>
                        <div className="textual">
                            <h2>React js</h2>
                            <p>16 hrs</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StudentDashboard
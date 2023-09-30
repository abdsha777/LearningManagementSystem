import React from 'react'
import './StudentDashboard.css'
import img from "../../assets/image.jpg"
import ci from "../../assets/certificate_icon.jpg"

function StudentDashboard() {
    return (
        <div>
            <div className="header-sd">
                <h1 align="left">Overview</h1>
            </div>

            <div className='over-afridi'>
     <div className='green-afridi'>
     <div className='green-icon'>
     <img src='' /> 
             </div>
     <div className='text-in-green'>
     <div className='greendiv-motive'>
         <p>Ongoing course</p></div><div className='greendiv-head'>
         <h3>5 </h3></div>
         </div>
        </div>
     
     <div className='green-afridi'>
         <div className='green-icon'>
         <img src='' /> 
         </div>
     <div className='text-in-green'>
     <div className='greendiv-motive'>
     <p>Completed Course</p></div><div className='greendiv-head'>
         <h3>6</h3></div>
         </div>
     </div>
    
      <div className='green-afridi'>
      <div className='green-icon'>
            <img src='' /> 
             </div>
      <div className='text-in-green'>
          <div className='greendiv-motive'>
      <p>Certificates Earned</p> </div>
         <h3>5</h3>
         </div>
          </div>
</div>


            <h1>Courses Your Taking</h1>

            <div className="display-info">
                <table className="table-h-afridi" width="100%">
                     <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Module Completed</th>
                        <th>Instructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>React Js</td>
                        <td>2/10</td>
                        <td>kamil khan</td>
                    </tr>

                    <tr>
                        <td>C++</td>
                        <td>10/10</td>
                        <td>Farzana maam</td>
                    </tr>

                    <tr>
                        <td>Web technology</td>
                        <td>9/10</td>
                        <td>Sumaiya tamboli</td>
                    </tr>
                    </tbody>
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
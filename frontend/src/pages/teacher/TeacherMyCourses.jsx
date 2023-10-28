import React,{useEffect, useState} from 'react'
import './TeacherMyCourses.css'
function TeacherMyCourses() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const dbJson = "http://localhost:7000";
    const[course,setCourse]=useState([])
    const[module,setModule]=useState([])

    const getCoureList=()=>{
        fetch(`${dbJson}/Teacher_mycourse_course`)
        .then(response=>response.json())
        .then(data=>setCourse(data))
        .catch(error=>console.log(error))
    }
    const getModuleList=()=>{
        fetch(`${dbJson}/Teacher_mycourse_module`)
        .then(response=>response.json())
        .then(data=>setModule(data))
        .catch(error=>console.log(error))
    }
    useEffect(()=>{
        getCoureList();
        getModuleList();
    },[])
  return (
    <div>
        
        <div>
            <h1>My Course</h1>
            {
                course.map((record,key)=>{
                    return(
                        <div className="video-component" key={key}>
                        <h1>{record.course_name}</h1>
                            <div className="videos">
                           {
                            module.map((rec,key)=>{
                                return(
                                    <div className="video-box" key={key}>
                                    <div className="video-img" style={{ backgroundImage: `url(${rec.image})` }} ></div>
                                    <div className="video-info">
                                        <h1>{rec.module_name}</h1>
                                    </div>
                                    <small>Duration:{rec.duration} Hours</small>
                                </div>
                                )
                            })
                           }
            
                            </div>
                        </div>
                    )
                })
            }

        </div>
    </div>
  )
}

export default TeacherMyCourses
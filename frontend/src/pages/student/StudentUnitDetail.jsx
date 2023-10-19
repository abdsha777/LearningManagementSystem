import React,{useEffect, useState} from "react";
import image from '../../assets/image.jpg'
import { Link } from "react-router-dom";

function StudentUnitDetail() {
    // const dbJson = "https://jsonserver-6gyk.onrender.com";
    const dbJson = " http://localhost:7000";
    const[unitModule,setUnitModule]=useState([])
  const[unitVideo,setUnitVideo]=useState([])

  const getModuleList=()=>{
    fetch(`${dbJson}/Unit_module`)
    .then(response=>response.json())
    .then(data=>setUnitModule(data[0]))
    .catch(error=>console.log(error))
  }
  const getVideoList=()=>{
    fetch(`${dbJson}/Unit_video`)
    .then(response=>response.json())
    .then(data=>setUnitVideo(data))
    .catch(error=>console.log(error))
  }

  useEffect(()=>{
    getModuleList();
    getVideoList();
  },[])

  return (
    <div>
      <div className="module">
        <h3 className="heading">Module:</h3>
        <h3 className="heading">{unitModule.no}</h3>
        <h2>Module Name:</h2>
        <p>{unitModule.name}</p>
        <h2>Duration:</h2>
        <p>{unitModule.duration}</p>
        <h2>Description:</h2>
        <p>
        {unitModule.description}
        </p>
      </div>
      <div className="button">
        <button className="btn btn-filled download-btn">
          Notes
          <svg
            fill="#ffffff"
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path d="M512 666.5L367.2 521.7l36.2-36.2 83 83V256h51.2v312.5l83-83 36.2 36.2L512 666.5zm-204.8 50.3V768h409.6v-51.2H307.2z" />
            </g>
          </svg>
        </button>
      </div>

      <div className="video-component">
        <p className="heading">Videos</p>
        <div className="videos">
          {
            unitVideo.map((record)=>{
              return(
                <Link to='video/1/' className='video-box-link'>
            <div className="video-box">
              <div className="video-img" style={{ backgroundImage: `url(${record.image})` }} ></div>
              <div className="video-info">
                <h1>{record.module_name}</h1>
              </div>
              <small>Duration:{record.duration} Hours</small>
            </div>
          </Link>
              )
            })
          }
          
        </div>
      </div>
    </div>
  );
}

export default StudentUnitDetail;

import React from 'react'
import './navigation.css'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div>
        <h2>Navigation Menu </h2> <small>check out your code</small>
        <div className='nav-links'>
            <Link to={'/teacherCourseDetail'}>Teacher Course Detail</Link>
        </div>
    </div>
  )
}

export default Navigation
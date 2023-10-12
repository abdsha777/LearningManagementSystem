import React from 'react'
import './Doubts.css'
import AllDoubts from './AllDoubts';
import DoubtMessages from './DoubtMessages';
import { Outlet } from 'react-router-dom';

function Doubts() {
  return (
    <div className='doubt-body'>

        <h1>Doubts</h1>
        {/* <AllDoubts /> */}
        {/* <DoubtMessages /> */}
        <Outlet />
    </div>
  )
}

export default Doubts
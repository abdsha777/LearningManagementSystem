import React from 'react'
import './Doubts.css'
import AllDoubts from './AllDoubts';
import DoubtMessages from './DoubtMessages';

function Doubts() {
  return (
    <div className='doubt-body'>

        <h1>Doubts</h1>
        {/* <AllDoubts /> */}
        <DoubtMessages />
    </div>
  )
}

export default Doubts
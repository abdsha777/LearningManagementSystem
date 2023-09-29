import React from 'react'
import "./StudentTest.css";

function StudentTest() {
  return (
    <div>
        StudentTest
        <p className="vt_head">Test on module 1</p>

      {/* subheading */}
      <div className="con1">
        <p className="vt_subheading1">Test name:</p>
        <p className="vit_subheading2">React</p>
      </div>

      {/* card 1 */}
      <div className="con2">
        {/* question */}
        <div className="question">
          <div className="q">Q1:</div>
          <div className="qsh">What is react?</div>
        </div>

        {/* main options */}
        <div className="main-option">
          {/* option */}
          <div className="om">
            <input type="radio" id="option1" name="q1" value="HTML" />
            <label htmlFor="option1">A:Style</label>
          </div>

          {/* option */}
          <div className="om">
            <input type="radio" id="option2" name="q1" value="HTML" />
            <label htmlFor="option2">A:Style</label>
          </div>

          {/* option */}
          <div className="om">
            <input type="radio" id="option3" name="q1" value="HTML" />
            <label htmlFor="option3">A:Style</label>
          </div>

          {/* option */}
          <div className="om">
            <input type="radio" id="option4" name="q1" value="HTML" />
            <label htmlFor="option4">A:Style</label>
          </div>
        </div>
      </div>

      {/* card 2 */}
      <div className="con2">
        {/* question */}
        <div className="question">
          <div className="q">Q2:</div>
          <div className="qsh">What is React?</div>
        </div>

        {/* main options */}
        <div className="main-option">
          {/* option */}
          <div className="om">
            <input type="radio" id="option5" name="q2" value="HTML" />
            <label htmlFor="option5">A:Style</label>
          </div>

          {/* option */}
          <div className="om">
            <input type="radio" id="option6" name="q2" value="HTML" />
            <label htmlFor="option6">A:Style</label>
          </div>

          {/* option */}
          <div className="om">
            <input type="radio" id="option7" name="q2" value="HTML" />
            <label htmlFor="option7">A:Style</label>
          </div>

          {/* option */}
          <div className="om">
            <input type="radio" id="option8" name="q2" value="HTML" />
            <label htmlFor="option8">A:Style</label>
          </div>
        </div>
      </div>

      <button className="btn-filled">Submit</button>
        </div>
  )
}

export default StudentTest
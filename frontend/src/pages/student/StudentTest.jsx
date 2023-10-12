import React from 'react'
import "./StudentTest.css";

function StudentTest() {
  return (
    <div className="vt_module">

            <p className="vt_head"> Test on module 1</p>

            <div className="con1">
                <p className="vt_subheading1">Test name:</p>
                <p className="vit_subheading2">React</p>
            </div>
            <div className="con2">
                <div className="question">
                    <div className="q">Q1:</div>
                    <div className="qsh">What is react?</div>
                </div>
                 <div className="main-option">
                    <div className="om"><input type="radio" id="option1" name="q1" value="HTML" />
                    <label htmlFor="option1">A:Style</label></div>

                    <div className="om"><input type="radio" id="option2" name="q1" value="HTML" />
                    <label htmlFor="option2">A:Style</label></div>

                    <div className="om"><input type="radio" id="option3" name="q1" value="HTML" />
                    <label htmlFor="option3">A:Style</label></div>

                   <div className="om"> <input type="radio" id="option4" name="q1" value="HTML" />
                    <label htmlFor="option4">A:Style</label></div>
                 </div>
            </div>
            <div className="con2">
                <div className="question">
                    <div className="q">Q1:</div>
                    <div className="qsh">What is react?</div>
                </div>
                 <div className="main-option">
                    <div className="om"><input type="radio" id="option1" name="q2" value="HTML" />
                    <label htmlFor="option1">A:Style</label></div>

                    <div className="om"><input type="radio" id="option2" name="q2" value="HTML" />
                    <label htmlFor="option2">A:Style</label></div>

                    <div className="om"><input type="radio" id="option3" name="q2" value="HTML" />
                    <label htmlFor="option3">A:Style</label></div>

                   <div className="om"> <input type="radio" id="option4" name="q2" value="HTML" />
                    <label htmlFor="option4">A:Style</label></div>
                 </div>
            </div>

            <button className="btn btn-filled">Submit</button>

        </div>
  )
}

export default StudentTest
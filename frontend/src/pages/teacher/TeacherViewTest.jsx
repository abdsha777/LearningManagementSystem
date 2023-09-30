import React from 'react'
import './TeacherViewTest.css'

function TeacherViewTest() {
  return (
    <div>
      TeacherViewTest
      <div className="viewtest_module1">
            <p className="viewtest_heading">Test on module 1</p>

            <div className="viewtest_module2">
                <p className="viewtest_subheading1">Test name:</p>
                <p className="viewtest_subheading2">React</p>
            </div>

            <div className="viewtest_module3">
                <div className="card1">
                    <div className="question">
                        <div className="que1">Q1:</div>
                        <div className="sb_m1">What is react?</div>
                    </div>

                    <div className="main_options">
                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">A:Style</label><br />

                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">B:Style</label><br />

                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">C:Style</label><br />

                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">D:Style</label><br />

                        
                    </div>

                    <div className="answer">
                        <div className="crr">Correct Answer:</div>
                        <div className="sb_m2">Frame Work</div>

                        <div className="update">
                            <button className="btn-filled">Update Question</button>
                        </div>
                    </div>
                </div>

                <div className="viewtest_module4">
                <div className="card2">
                    <div className="question1">
                        <div className="que2">Q1:</div>
                        <div className="sb_m5">What is react?</div>
                    </div>

                    <div className="main_options2">
                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">A:Style</label><br />

                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">B:Style</label><br />

                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">C:Style</label><br />

                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label htmlFor="html">D:Style</label><br />

                        
                    </div>
                     < div class="answer-and-updateb">

                    <div className="answer2">
                        <div className="crr1">Correct Answer:</div>
                        <div className="sb_m6">Frame Work</div>

                        <div className="update1">
                            <button className="btn-filled">Update Question</button>
                        </div>
                        </div>
                    </div>
                </div>


                
            </div>

            

            <div className="updatetest1">
                <button className="btn-filled">Update Test</button>
            </div>
        </div>
        </div>
      
      </div>
  )
}

export default TeacherViewTest
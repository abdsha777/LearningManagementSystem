import React from "react";
import "./TeacherViewTest.css";

function TeacherViewTest() {
  return (
    <div>
      TeacherViewTest
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
            <input type="radio" id="html1" name="fav_language" value="HTML" />
            <label htmlFor="html1">A:Style</label>
            <br />

            <input type="radio" id="html2" name="fav_language" value="HTML" />
            <label htmlFor="html2">B:API</label>
            <br />

            <input type="radio" id="html3" name="fav_language" value="HTML" />
            <label htmlFor="html3">C:Frame Work</label>
            <br />

            <input type="radio" id="html4" name="fav_language" value="HTML" />
            <label htmlFor="html4">D:Server</label>
            <br />
          </div>

          <div className="answer">
            <div className="crr">Correct Answer:</div>
            <div className="sb_m2">Frame Work</div>

            <div className="update">
              <input
                type="button"
                className="update_question"
                value="Update Question"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="viewtest_module4">
        <div className="card2">
          <div className="question1">
            <div className="que2">Q2:</div>
            <div className="sb_m5">What is react?</div>
          </div>

          <div className="main_options2">
            <input type="radio" id="html5" name="fav_language" value="HTML" />
            <label htmlFor="html5">A:Style</label>
            <br />

            <input type="radio" id="html6" name="fav_language" value="HTML" />
            <label htmlFor="html6">B:API</label>
            <br />

            <input type="radio" id="html7" name="fav_language" value="HTML" />
            <label htmlFor="html7">C:Frame Work</label>
            <br />

            <input type="radio" id="html8" name="fav_language" value="HTML" />
            <label htmlFor="html8">D:Server</label>
            <br />
          </div>

          <div className="answer-and-updateb">
            <div className="answer2">
              <div className="crr1">Correct Answer:</div>
              <div className="sb_m6">Frame Work</div>
            </div>
            <div className="update1">
              <input
                type="button"
                className="update_question1"
                value="Update Question"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="viewtest_module5">
        <input type="button" className="Update_test" value="Update test" />
      </div>
    </div>
  );
}

export default TeacherViewTest;

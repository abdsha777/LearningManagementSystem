import React from 'react'
import studentImg from '../../assets/shehzad.png';

function AllDoubts() {
    return (
        <div className="doubts">
            {/* id doubt has solved class the solved appears */}
            <div className="doubt solved">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="question">I have a doubt!</p>
                    <p className="time">12:00pm 31/14/2027</p>
                </div>
                <div className="solved-mark">
                    <p>solved</p>
                </div>
            </div>

            <div className="doubt ">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="question">I have a doubt!</p>
                    <p className="time">12:00pm 31/14/2027</p>
                </div>
                <div className="solved-mark">
                    <p>solved</p>
                </div>
            </div>
            <div className="doubt">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="question">I have a doubt!</p>
                    <p className="time">12:00pm 31/14/2027</p>
                </div>
                <div className="solved-mark">
                    <p>solved</p>
                </div>
            </div>

        </div>
    )
}

export default AllDoubts
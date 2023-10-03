import React from 'react'
import studentImg from '../../assets/shehzad.png';
import { Link } from 'react-router-dom';

function AllDoubts() {
    return (
        <div className="doubts">
            {/* id doubt has solved class the solved appears */}
            <Link to="doubt/1/" className="doubt solved">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="question">I have a doubt!</p>
                    <p className="time">12:00pm 31/14/2027</p>
                </div>
                <div className="solved-mark">
                    <p>solved</p>
                </div>
            </Link>

            <Link to="doubt/2/" className="doubt ">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="question">I have a doubt!</p>
                    <p className="time">12:00pm 31/14/2027</p>
                </div>
                <div className="solved-mark">
                    <p>solved</p>
                </div>
            </Link>
            <Link to="doubt/3/" className="doubt">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="question">I have a doubt!</p>
                    <p className="time">12:00pm 31/14/2027</p>
                </div>
                <div className="solved-mark">
                    <p>solved</p>
                </div>
            </Link>

        </div>
    )
}

export default AllDoubts
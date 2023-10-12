import React from 'react'
import studentImg from '../../assets/shehzad.png';
import abd from '../../assets/abd.jpeg';

function DoubtMessages() {
    return (
        <div className='doubt-messages'>

            <div className="user-details">
                <img src={studentImg} alt="" />
                <div className="doubt-info">
                    <p className="name">Shehzad</p>
                    <p className="class">TYBCA</p>
                </div>
            </div>

            <div className="question-body">
                <svg viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M20.5 0C16.4455 0 12.482 1.2023 9.11082 3.45487C5.73961 5.70744 3.11207 8.9091 1.56048 12.655C0.00888238 16.4009 -0.397086 20.5227 0.393911 24.4993C1.18491 28.476 3.13734 32.1287 6.00432 34.9957C8.87129 37.8627 12.524 39.8151 16.5007 40.6061C20.4773 41.3971 24.5991 40.9911 28.345 39.4395C32.0909 37.8879 35.2926 35.2604 37.5451 31.8892C39.7977 28.518 41 24.5545 41 20.5C40.9943 15.0648 38.8326 9.8539 34.9893 6.01065C31.1461 2.1674 25.9352 0.00573964 20.5 0ZM20.5 33.1154C20.0322 33.1154 19.5749 32.9767 19.1859 32.7167C18.7969 32.4568 18.4937 32.0874 18.3147 31.6552C18.1356 31.223 18.0888 30.7474 18.1801 30.2885C18.2713 29.8297 18.4966 29.4082 18.8274 29.0774C19.1582 28.7466 19.5797 28.5213 20.0385 28.4301C20.4974 28.3388 20.973 28.3856 21.4052 28.5647C21.8374 28.7437 22.2068 29.0469 22.4667 29.4359C22.7267 29.8248 22.8654 30.2822 22.8654 30.75C22.8654 31.3773 22.6162 31.979 22.1726 32.4226C21.729 32.8662 21.1273 33.1154 20.5 33.1154ZM22.0769 23.5119V23.6538C22.0769 24.0721 21.9108 24.4732 21.6151 24.7689C21.3193 25.0646 20.9182 25.2308 20.5 25.2308C20.0818 25.2308 19.6807 25.0646 19.385 24.7689C19.0892 24.4732 18.9231 24.0721 18.9231 23.6538V22.0769C18.9231 21.6587 19.0892 21.2576 19.385 20.9619C19.6807 20.6661 20.0818 20.5 20.5 20.5C23.1078 20.5 25.2308 18.726 25.2308 16.5577C25.2308 14.3894 23.1078 12.6154 20.5 12.6154C17.8922 12.6154 15.7692 14.3894 15.7692 16.5577V17.3462C15.7692 17.7644 15.6031 18.1655 15.3074 18.4612C15.0116 18.7569 14.6105 18.9231 14.1923 18.9231C13.7741 18.9231 13.373 18.7569 13.0773 18.4612C12.7815 18.1655 12.6154 17.7644 12.6154 17.3462V16.5577C12.6154 12.6449 16.1516 9.46154 20.5 9.46154C24.8484 9.46154 28.3846 12.6449 28.3846 16.5577C28.3846 19.9836 25.6723 22.8516 22.0769 23.5119Z" fill="#5DDCD6" />
                </svg>
                <p className="question">
                    I tried installing react but an error is appearing.
                </p>
            </div>

            <div className="message-field">
                <input type="text" placeholder='message...' />
                <button>
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.265 4.42619C1.04293 2.87167 2.6169 1.67931 4.05323 2.31397L21.8341 10.1706C23.423 10.8727 23.423 13.1273 21.8341 13.8294L4.05323 21.686C2.6169 22.3207 1.04293 21.1283 1.265 19.5738L1.99102 14.4917C2.06002 14.0087 2.41458 13.6156 2.88791 13.4972L8.87688 12L2.88791 10.5028C2.41458 10.3844 2.06002 9.99129 1.99102 9.50829L1.265 4.42619ZM21.0257 12L3.2449 4.14335L3.89484 8.69294L12.8545 10.9328C13.9654 11.2106 13.9654 12.7894 12.8545 13.0672L3.89484 15.3071L3.2449 19.8566L21.0257 12Z" fill="#0F0F0F" />
                    </svg>
                </button>
            </div>

            <div className="messages">
                <div className="message me">
                    <img src={studentImg} alt="" />
                    <div className="message-body">
                        <p>hello how are you</p>
                        <small>11:58 pm</small>
                    </div>
                    <img src={studentImg} alt="" />
                </div>
                <div className="message others">
                    <img src={abd} alt="" />
                    <div className="message-body">
                        <p>hello bro</p>
                        <small>11:58 pm</small>
                    </div>
                    <img src={abd} alt="" />
                </div>
                <div className="message me">
                    <img src={studentImg} alt="" />
                    <div className="message-body">
                        <p>hello how are you</p>
                        <small>11:58 pm</small>
                    </div>
                    <img src={studentImg} alt="" />
                </div>
                <div className="message others">
                    <img src={abd} alt="" />
                    <div className="message-body">
                        <p>hello bro</p>
                        <small>11:58 pm</small>
                    </div>
                    <img src={abd} alt="" />
                </div>
                <div className="message me">
                    <img src={studentImg} alt="" />
                    <div className="message-body">
                        <p>hello how are you</p>
                        <small>11:58 pm</small>
                    </div>
                    <img src={studentImg} alt="" />
                </div>
                <div className="message others">
                    <img src={abd} alt="" />
                    <div className="message-body">
                        <p>hello bro</p>
                        <small>11:58 pm</small>
                    </div>
                    <img src={abd} alt="" />
                </div>
            </div>
        </div>
    )
}

export default DoubtMessages
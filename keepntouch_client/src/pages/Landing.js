import React from 'react';
import { Link } from 'react-router-dom';

import '../css/landing.css';

const Landing = () => {
  return (
  <div className='landing-page'>
    <div className='text-block'>
        <div className="title">
            <h1>KEEP'N</h1>
            <h1>'TOUCH</h1>
        </div>
        <p>Did you forget again to send that message? Is it hard for you to find time to talk with your beloved ones? No worries, with us, keeping in touch has never been easier!</p>
        <div className="action-buttons">
            <Link className='button-link' to='/login'><h2>START CHATTING <img src="/icons/arrow1.svg" alt="start chatting" /></h2></Link>
            <Link className='button-link' to='/read-more'><h2>READ MORE <img src="/icons/arrow1.svg" alt="read more" /></h2></Link>
        </div>
    </div>;  

    <div className='side-deco'>
        <div className="side-deco-header">
            <div className="profile-circle"></div>
            <h3>welcome!</h3>
        </div>
        <div className="separator"></div>
        <div className="messages-block">
            <div className="margin-box"></div>
            <div className="message message1"></div>
            <div className="margin-box"></div>
            <div className="message message2"></div>
            <div className="margin-box"></div>
            <div className="message message3"></div>
            <div className="margin-box"></div>
            <div className="message message4"></div>
            <div className="margin-box"></div>
            <div className="message animated-message-block">
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
            </div>
        </div>
    </div>;
  </div>
  );
};

export default Landing;

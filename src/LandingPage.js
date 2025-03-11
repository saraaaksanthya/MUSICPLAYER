import React from 'react';
//import './LandingPage.css'; // Import the CSS file

const LandingPage = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="landing-page">
        <div className='welcome-message'>
      <h1>Hello, there!</h1>
      <h2>If you're an existing user, kindly login.</h2>
      <h2>If not, please signup.</h2>
      </div>
      <button onClick={onLoginClick} className="login-button">Log In</button>
      <button onClick={onSignupClick} className="signup-button">Sign Up</button>
    </div>
  );
};

export default LandingPage;

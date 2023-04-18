import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate('/login');
  }
  function handleRegisterClick(){
    navigate('/register');
  }

  return (
    <div className="landing-page">
        <div className = "topLanding">
            <a href = "/"><img className = "kenkologo" src = "/kenkologo.png" alt = "Logo"/></a>
            <button className = "login-btn" onClick={handleLoginClick}>Login</button>
            <button className = "register-btn" onClick={handleRegisterClick}>Register</button>
        </div>
        <div className = "image-stack">
            <img className = "landing1" src = "/landing1.png" alt = "Landing"/>
            <img className = "landing2" src = "/landing2.png" alt = "Landing"/>
            <img className = "landing3" src = "/landing3.png" alt = "Landing"/>
        </div>
    </div>
  );
}


export default LandingPage;
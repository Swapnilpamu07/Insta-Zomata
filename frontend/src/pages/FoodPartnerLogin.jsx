import React, { useState } from 'react';
import '../css/FoodPartnerLogin.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const FoodPartnerLogin = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,set_password]=useState("");
  async function handleSubmit(e){
    e.preventDefault();
    const data={
      email,
      password
    }
    await axios
      .post("http://localhost:8000/foodPartner/login", data, {
        withCredentials: true, // 👈 very important
      })
      .then(function (response) {
        alert('Login Sucessful')
        navigate("/");
      })
      .catch(function (error) {
        alert("Check Credentials")
        console.log(error);
      });
  }
  return (
    <div className="auth-container partner-auth">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Partner Login</h2>
          <p className="auth-subtitle">Access your restaurant dashboard</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-group">
              <label htmlFor="email">Business Email</label>
              <input
              style={{paddingLeft:"50px " }}
                type="email"
                id="email"
                placeholder="Enter business email"
                className="form-input"
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
              style={{paddingLeft:"50px " }}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-input"
                onChange={(e)=>{set_password(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
        
          <button type="submit" className="auth-button">
            <span>Login to Dashboard</span>
            <i className="fas fa-chart-line"></i>
          </button>
        </form>
        
        <p className="auth-footer">
          Don't have an account? <a href="/foodPartnerSignup" className="auth-link">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
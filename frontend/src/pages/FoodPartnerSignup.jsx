import React, { useState } from 'react';
import '../css/FoodPartnerSignup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const FoodPartnerSignup = () => {
  const navigate=useNavigate();
  const [restaurantName,set_restaureantName]=useState("");
  const [ownerName,set_ownerName]=useState("");
  const [businessEmail,set_businessEmail]=useState("");
  const [phoneNo,set_phoneNo]=useState("");
  const [businessAdd,set_businessAdd]=useState("");
  const [password,set_password]=useState("");


  async function handleSubmit(e){
     e.preventDefault(); 
     const data={
      restaurantName,
      ownerName,
      businessEmail,
      phoneNo,
      businessAdd,
      password
     }
      await axios
      .post("http://localhost:8000/foodPartner/signup", data, {
        withCredentials: true, // 👈 very important
      })
      .then(function (response) {
        alert("Registered Sucessfully");
        console.log("Uploading to Backend Done", response);
        navigate("/")
      })
      .catch(function (error) {
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
          <h2 className="auth-title">Become a Food Partner</h2>
          <p className="auth-subtitle">Join our platform and grow your business</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-group">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input
              style={{paddingLeft:"50px " }}
                type="text"
                id="restaurantName"
                placeholder="Enter restaurant name"
                className="form-input"
                onChange={(e)=>{set_restaureantName(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-utensils"></i>
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="ownerName">Owner Name</label>
              <input
              style={{paddingLeft:"50px " }}
                type="text"
                id="ownerName"
                placeholder="Enter owner's name"
                className="form-input"
                onChange={(e)=>{set_ownerName(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-user-tie"></i>
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Business Email</label>
              <input
              style={{paddingLeft:"50px " }}
                type="email"
                id="email"
                placeholder="Enter business email"
                className="form-input"
                onChange={(e)=>{set_businessEmail(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
              style={{paddingLeft:"50px " }}
                type="tel"
                id="phone"
                placeholder="Enter business phone number"
                className="form-input"
                onChange={(e)=>{set_phoneNo(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Business Address</label>
              <input
              style={{paddingLeft:"50px " }}
                type="text"
                id="address"
                placeholder="Enter full business address"
                className="form-input"
                onChange={(e)=>{set_businessAdd(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-map-marker-alt"></i>
              </span>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
              style={{paddingLeft:"50px " }}
                type="password"
                id="password"
                placeholder="Create a password"
                className="form-input"
                onChange={(e)=>{set_password(e.target.value)}}
              />
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          
          <button type="submit" className="auth-button" >
            <span>Register Restaurant</span>
            <i className="fas fa-store"></i>
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <a href="/foodPartnerLogin" className="auth-link">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerSignup;
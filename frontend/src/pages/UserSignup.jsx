import React, { useState } from "react";
import "../css/UserSignup.css";
import axios from "axios";

const UserSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, set_password] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(data);
    await axios
      .post("http://localhost:8000/user/signup", data, {
        withCredentials: true, // 👈 very important
      })
      .then(function (response) {
        console.log("Uploading to Backend Done", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Join Our Food Community</h2>
          <p className="auth-subtitle">
            Create your account to discover amazing food experiences
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-group">
              <label htmlFor="fullName">First Name</label>
              <input
                style={{ paddingLeft: "50px " }}
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className="form-input"
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="LastName">Last Name</label>
              <input
                style={{ paddingLeft: "50px " }}
                type="text"
                id="LastName"
                placeholder="Enter your full name"
                className="form-input"
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                style={{ paddingLeft: "50px " }}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="form-input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                style={{ paddingLeft: "50px " }}
                type="password"
                id="password"
                placeholder="Create a password"
                className="form-input"
                onChange={(e) => {
                  set_password(e.target.value);
                }}
              />
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <button type="submit" className="auth-button">
            <span>Create Account</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a href="/userLogin" className="auth-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;

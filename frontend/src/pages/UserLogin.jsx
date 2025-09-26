import React from "react";
import "../css/UserLogin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, set_password] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    await axios
      .post("http://localhost:8000/user/login", data, {
        withCredentials: true, // 👈 very important
      })
      .then(function (response) {
        console.log("Uploading to Backend Done", response);
      })
      .catch(function (error) {
        console.log(error);
      });
      navigate("/");
  }
  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue your food journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
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
                placeholder="Enter your password"
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
            <span>Sign In</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <a href="/userSignup" className="auth-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;

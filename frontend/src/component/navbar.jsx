import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isFoodPartnerLoggedIn, setIsFoodPartnerLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  function checkCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2;
  }

  useEffect(() => {
    setIsUserLoggedIn(checkCookie("Usertoken"));
    setIsFoodPartnerLoggedIn(checkCookie("foodPartnertoken"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRegisterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleRegister = () => setIsRegisterOpen(!isRegisterOpen);
  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);

  const handleLogout = () => {
    if (isUserLoggedIn) {
      document.cookie = "Usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsUserLoggedIn(false);
    }
    if (isFoodPartnerLoggedIn) {
      document.cookie = "foodPartnertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsFoodPartnerLoggedIn(false);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">FoodTube</Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>

          {!isUserLoggedIn && !isFoodPartnerLoggedIn ? (
            <div className="nav-buttons">
              <button className="login-btn" onClick={toggleLogin}>
                Login <span className={`dropdown-arrow ${isLoginOpen ? 'open' : ''}`}>▼</span>
              </button>
              {isLoginOpen && (
                <div className="dropdown-menu">
                  <Link to="/userLogin" onClick={() => { setIsLoginOpen(false); setIsMenuOpen(false); }}>User</Link>
                  <Link to="/foodPartnerLogin" onClick={() => { setIsLoginOpen(false); setIsMenuOpen(false); }}>Food Partner</Link>
                </div>
              )}

              <div className="register-dropdown" ref={dropdownRef}>
                <button className="register-btn" onClick={toggleRegister}>
                  Register <span className={`dropdown-arrow ${isRegisterOpen ? 'open' : ''}`}>▼</span>
                </button>
                {isRegisterOpen && (
                  <div className="dropdown-menu">
                    <Link to="/userSignup" onClick={() => { setIsRegisterOpen(false); setIsMenuOpen(false); }}>User</Link>
                    <Link to="/foodPartnerSignup" onClick={() => { setIsRegisterOpen(false); setIsMenuOpen(false); }}>Food Partner</Link>
                  </div>
                )}
              </div>
            </div>
          ) : isUserLoggedIn ? (
            <div className="nav-loggedin">
              <Link to="/viewFood" className="nav-link-btn">View Food</Link>
              <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : isFoodPartnerLoggedIn ? (
            <div className="nav-loggedin">
              <Link to="/addFood" className="nav-link-btn">Add Food</Link>
              <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : null}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  function handleLogoutClick() {
    navigate('/')
    if (!user) {
      return;
    }
    
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.status === 401) {
        setUser(null);
      }
      navigate('/')
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  return (
    <nav className="navbar">
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/venues" className="nav-link">
        Venues
      </NavLink>
      <NavLink to="/vendors" className="nav-link">
        Vendors
      </NavLink>
      <NavLink to="/entertainment" className="nav-link">
        Entertainment
      </NavLink>
      <NavLink to="/user" className="nav-link">
        User Profile
      </NavLink>
      <NavLink onClick={handleLogoutClick}>
          Logout
      </NavLink>
    </nav>
    );
};

export default NavBar;
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const {user, setUser} = useContext(UserContext)

  function handleLogoutClick() {
    if (!user) {
      return;
    }
    
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.status === 401) {
        setUser(null);
      } 
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Login
      </NavLink>
      <br/>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <br/>
      <NavLink to="/venues" className="nav-link">
        Venues
      </NavLink>
      <br/>
      <NavLink to="/vendors" className="nav-link">
        Vendors
      </NavLink>
      <br/>
      <NavLink to="/entertainment" className="nav-link">
        Entertainment
      </NavLink>
      <br/>
      <NavLink to="/user" className="nav-link">
        User Profile
      </NavLink>
      <br/>
      <NavLink to='/' className="nav-link" onClick={handleLogoutClick}>
          Logout
      </NavLink>
    </nav>
    );
};

export default NavBar;
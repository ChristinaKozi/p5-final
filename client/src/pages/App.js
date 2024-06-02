import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import Login from "./Login"
import { UserContext } from "../contexts/UserContext";
import Home from "./Home";
import BookingForm from "../components/BookingForm";

function App() {
  const { user } = useContext(UserContext)

  if (!user) return <Login />;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className= 'header'>
        <h1>Home/Splash Page</h1> 
        <h2>Hi, {user.username}!</h2>
      </div>
      <div className="center">
        <Home />
        <p>Let's get started!</p>
      </div>
      <BookingForm />
    </>
  )
};

export default App;


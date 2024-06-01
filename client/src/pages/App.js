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
      <h1>Home/Splash Page</h1> 
      <h2>Hi, {user.username}!</h2>
      <Home />
      <p>Let's get started!</p>
      <BookingForm />
    </>
  )
};

export default App;


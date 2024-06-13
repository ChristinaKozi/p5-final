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
      <div className="center">
        <Home />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4>Let's get started!</h4>
      </div>
      <BookingForm />
    </>
  )
};

export default App;


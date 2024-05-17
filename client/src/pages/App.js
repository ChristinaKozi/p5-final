import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import Login from "./Login"
import { UserContext } from "../contexts/UserContext";

function App() {
  const { user } = useContext(UserContext)

  // if (!user) return <Login />;
  
  return (
    <>
      <header>
        <NavBar />
      </header>
      <h1>Home/Splash Page</h1> 
    </>
  )
};

export default App;


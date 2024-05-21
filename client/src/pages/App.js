import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
// import { useNavigate } from "react-router-dom";
import Login from "./Login"
import { UserContext } from "../contexts/UserContext";
import Home from "./Home";

function App() {
  const { user } = useContext(UserContext)
  // const navigate = useNavigate();

  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState('')

  if (!user) return <Login />;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(date, startTime, endTime, numberOfGuests)
    // navigate('/venues')
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <h1>Home/Splash Page</h1> 
      <h2>Hi, {user.username}!</h2>
      <Home />
      <p>Let's get started!</p>
      <form onSubmit={handleSubmit}>
        {/* <formfeild> */}
          <label>Date: </label>
          <input
            type='date'
            placeholder="Date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>Start Time: </label>
          <input
            type='time'
            placeholder="Start Time"
            value={startTime}
            onChange={(e)=>setStartTime(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>End Time: </label>
          <input
            type='time'
            placeholder="End Time"
            value={endTime}
            onChange={(e)=>setEndTime(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>Number of Guests: </label>
          <input
            type='number'
            placeholder="Number of guests"
            value={numberOfGuests}
            onChange={(e)=>setNumberOfGuests(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <button type='submit'>Create Booking</button>
        {/* </formfeild> */}
      </form>
    </>
  )
};

export default App;


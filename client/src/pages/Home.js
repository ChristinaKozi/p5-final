import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Home() {
    const { user } = useContext(UserContext)

    return (
        <>
        <div className= 'header'>
            <h1>- The Smarter Party Planner -</h1> 
            {user? <h2>Hi, {user.username}!</h2> : <></>}
        </div>
        <p>This is your one stop event planning tool!</p>
        <p>Enter the date and time of your event below as well as the number of guests and you will be presented with a list of venues, vendors, and entertainers!</p>
        <p>It's your party.. plan it how you want to!</p>
        <img 
            src='https://m.media-amazon.com/images/I/81Q8d2FwjwL._AC_SL1500_.jpg' 
            alt='party'
            style={{ width: '500px', height: 'auto' }}
        />
        <br></br>
        <br></br>
        </>
    )
}

export default Home;
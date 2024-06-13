import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Home() {
    const { user } = useContext(UserContext)

    return (
        <>
        <div className= 'header'>
            <h1>Home Page</h1> 
            {user? <h2>Hi, {user.username}!</h2> : <></>}
        </div>
        <p>This is your one stop event planning tool!</p>
        <p>Enter the date and time of your event below as well as the number of guests and you will be presented with a list of venues, vendors, and entertainers!</p>
        <p>It's your party.. plan it how you want to!</p>
        <br></br>
        </>
    )
}

export default Home;
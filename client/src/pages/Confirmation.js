import React, {useContext} from "react";
import NavBar from "../components/NavBar"
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";

function Confirmation() {
    const { user } = useContext(UserContext) 
    const { date, startTime, endTime, numberOfGuests, bookingVenue, bookingVendor, bookingEntertainment, handleTimeFormat} = useContext(BookingContext) 

    console.log(date, startTime, endTime, numberOfGuests, 'venue' +bookingVenue.name, 'vendor' +bookingVendor.name, 'ent' +bookingEntertainment.name)

    return (
    <>
        <header>
        <NavBar />
        </header>
        <h1>Confirmation Page</h1>
        {user ? (
        <>
            <article>
                <h3>Review Confirmation:</h3>
                <h4>Date:</h4>
                <p>{date}</p>
                <h4>Start Time:</h4>
                <p>{handleTimeFormat(startTime)}</p>
                <h4>End Time:</h4>
                <p>{handleTimeFormat(endTime)}</p>
                <h4>Number of Guests:</h4>
                <p>{numberOfGuests}</p>
                <h4>Total fee:</h4>
                <p>${}</p>

            </article>
        </>
        ) : (
        <>    
            <h2>Nothing to confirm here</h2>
        </>
        )}
    </>
    )
}

export default Confirmation;
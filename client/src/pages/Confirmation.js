import React, {useContext} from "react";
import NavBar from "../components/NavBar"
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";

function Confirmation() {
    const { user } = useContext(UserContext) 
    const { date, startTime, endTime, numberOfGuests, bookingVenue, bookingVendor, bookingEntertainment} = useContext(BookingContext) 

    console.log(date, startTime, endTime, numberOfGuests, 'venue' +bookingVenue.hourly_fee, 'vendor' +bookingVendor.per_person_fee, 'ent' +bookingEntertainment.hourly_fee)

    const durationInHours = (start, end) => {
        const durationInMillis = new Date(end) - new Date(start);
        return durationInMillis / (1000 * 60 * 60);
    };

    let totalFee = 0;
    if (bookingEntertainment) {
        totalFee += bookingEntertainment.hourly_fee * durationInHours(startTime, endTime);
    }
    if (bookingVendor) {
        totalFee += bookingVendor.per_person_fee * numberOfGuests;
    }
    if (bookingVenue) {
        totalFee += bookingVenue.hourly_fee * durationInHours(startTime, endTime);
    }

    function handleClick() {
        console.log('clicked')
    }

    return (
    <>
        <header>
        <NavBar />
        </header>
        <h1>Confirmation Page</h1>
        <p> - Do not refresh page - </p>
        <p> - Please review and confirm the information below - </p>
        {user ? (
        <>
            <article>
                <h4>Date:</h4>
                <p>{date.toLocaleDateString()}</p>
                <h4>Start Time:</h4>
                <p>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>End Time:</h4>
                <p>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>Number of Guests:</h4>
                <p>{numberOfGuests}</p>
                <h4>Total fee:</h4>
                <p>${totalFee.toFixed(2)}</p>
                <button onClick={handleClick}>Confirm Booking:</button>
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
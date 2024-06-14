import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";
import { headers } from "../Globals";

function Confirmation() {
    const [errors, setErrors] = useState([]);
    const { user } = useContext(UserContext) 
    const { date, startTime, endTime, numberOfGuests, bookingVenue, bookingVendor, bookingEntertainment} = useContext(BookingContext) 

    const navigate = useNavigate();
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    
    const durationInHours = (start, end) => {
        const durationInMillis = new Date(end) - new Date(start);
        return (durationInMillis / (1000 * 60 * 60)).toFixed(2);
    };

    let totalFee = 0
    if (bookingEntertainment !== null) {
        totalFee += bookingEntertainment.hourly_fee * durationInHours(startTime, endTime)
    } 

    if (bookingVendor !== null) {
        totalFee += bookingVendor.per_person_fee * numberOfGuests
    }

    if (bookingVenue !== null) {
        totalFee += bookingVenue.hourly_fee * durationInHours(startTime, endTime)
    }

    // converts to UTC time zone
    const adjustedStartTime = new Date(startTime.getTime() - (startTime.getTimezoneOffset() * 60000))
    const adjustedEndTime = new Date(endTime.getTime() - (endTime.getTimezoneOffset() * 60000))

    const bookingData = {
        start_time: adjustedStartTime.toISOString(),
        end_time: adjustedEndTime.toISOString(),
        number_of_guests: numberOfGuests,
        user_id: user ? user.id : null,
        venue_id: bookingVenue ? bookingVenue.id : null,
        vendor_id: bookingVendor ? bookingVendor.id : null,
        entertainment_id: bookingEntertainment ? bookingEntertainment.id : null
    }

    function handleClick() {
        fetch('/bookings', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bookingData)
        })
        .then((r)=>{
            if (r.status === 201) {
                return r.json()
            } else {
                r.json().then((data)=> {
                    if (data.error) {
                        setErrors([data.error])
                    } else {
                        setErrors(data.errors);
                    }
                });
            }
        })
        setBookingConfirmed(!bookingConfirmed)
    }

    function handleNav() {
        navigate('/user')
    }

    return (
    <>
        <header>
        <NavBar />
        </header>
        <div className="header">
            <h1>Confirmation Page</h1>
            <p> - Please review and confirm the information below - </p>
        </div>
        {user ? ( 
        <>
            {bookingConfirmed ? ( 
            <div style={{ textAlign: 'center' }}>
                <p>Thank you for confirming your booking! </p> 
                <p>You can find all of your booking details in your User Profile.</p>
                <button onClick={handleNav}>Take me to my bookings</button> 
            </div>
            ) : ( 
            <article style={{ textAlign: 'center' }}>
                <h4 style={{ textDecoration: 'underline' }}>Booking Details:</h4>
                <h4>Date:</h4>
                <p>{date.toLocaleDateString()}</p>
                <h4>Start Time:</h4>
                <p>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>End Time:</h4>
                <p>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>Number of Guests:</h4>
                <p>{numberOfGuests}</p>
                <br></br>
                <h4 style={{ textDecoration: 'underline' }}>Total fee:</h4>
                {bookingVenue !== null ? (
                <>
                <p>- Venue Fee: <strong>{bookingVenue.name}</strong></p>
                <p>${bookingVenue.hourly_fee} per hour * {durationInHours(startTime, endTime)} {durationInHours(startTime, endTime) <= 1 ? 'hour':'hours'} </p>
                <p>{(bookingVenue.hourly_fee * durationInHours(startTime, endTime)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </>
                ) : (null)}

                {bookingVendor !== null ? (
                <>
                <p>- Vendor fee: <strong>{bookingVendor.name}</strong> </p>
                <p>${bookingVendor.per_person_fee} per person * {numberOfGuests} {numberOfGuests <= 1 ? 'guest':'guests'} </p>
                <p>{(bookingVendor.per_person_fee * numberOfGuests).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </>
                ) : (null)}

                {bookingEntertainment !== null ? (
                <>
                <p>- Entertainment fee: <strong>{bookingEntertainment.name}</strong></p>
                <p>${bookingEntertainment.hourly_fee} per hour * {durationInHours(startTime, endTime)} {durationInHours(startTime, endTime) <= 1 ? 'hour':'hours'} </p>
                <p>{(bookingEntertainment.hourly_fee * durationInHours(startTime, endTime)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </>
                ) : (null) }
                <p>------------------------------------</p>
                <p><strong> = Total: {totalFee.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></p>
                <button onClick={handleClick}>Confirm Booking</button>
                <br></br>
                <br></br>
                <br></br>
                {errors.map((err)=>(
                    <p key={err}>{err}</p>
                ))}
            </article>
            )}
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
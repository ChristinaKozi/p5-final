import React, {useContext,useState} from "react";
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

    const durationInHours = (start, end) => {
        const durationInMillis = new Date(end) - new Date(start);
        return durationInMillis / (1000 * 60 * 60);
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
        navigate('/user')
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
                {bookingVenue !== null ? (
                <>
                <p>Venue Fee: <strong>{bookingVenue.name}</strong></p>
                <p>${bookingVenue.hourly_fee} per hour * {(durationInHours(startTime, endTime)).toFixed(2)} {durationInHours(startTime, endTime) <= 1 ? 'hour':'hours'} </p>
                <p>{(bookingVenue.hourly_fee * durationInHours(startTime, endTime)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </>
                ) : (null)}

                {bookingVendor !== null ? (
                <>
                <p>Vendor fee: <strong>{bookingVendor.name}</strong> </p>
                <p>${bookingVendor.per_person_fee} per person * {numberOfGuests} {numberOfGuests <= 1 ? 'guest':'guests'} </p>
                <p>{(bookingVendor.per_person_fee * numberOfGuests).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </>
                ) : (null)}

                {bookingEntertainment !== null ? (
                <>
                <p>Entertainment fee: <strong>{bookingEntertainment.name}</strong></p>
                <p>${bookingEntertainment.hourly_fee} per hour * {(durationInHours(startTime, endTime)).toFixed(2)} {durationInHours(startTime, endTime) <= 1 ? 'hour':'hours'} </p>
                <p>{(bookingEntertainment.hourly_fee * durationInHours(startTime, endTime)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </>
                ) : (null) }

                <p><strong> = Total: {totalFee.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></p>
                <button onClick={handleClick}>Confirm Booking</button>
                {errors.map((err)=>(
                    <p key={err}>{err}</p>
                ))}
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
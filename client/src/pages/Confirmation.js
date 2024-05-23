import React, {useContext,useState} from "react";
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";
import { headers } from "../Globals";

function Confirmation() {
    const [errors, setErrors] = useState([]);
    const { user } = useContext(UserContext) 
    const { date, startTime, endTime, numberOfGuests, bookingVenue, bookingVendor, bookingEntertainment, setNewBooking} = useContext(BookingContext) 
    const navigate = useNavigate();

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

    const bookingData = {
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        number_of_guests: numberOfGuests,
        user_id: user.id,
        venue_id: bookingVenue.id,
        vendor_id: bookingVendor.id,
        entertainment_id: bookingEntertainment.id
    }

    function handleClick() {
        fetch('/bookings', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bookingData)
        })
        .then((r)=>{
            if (r.status === 201) {
                r.json().then(booking=>{
                    setNewBooking(booking)
                })
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
                <p>${totalFee.toFixed(2)}</p>
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
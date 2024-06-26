import React, { useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";
import '../css/index.css'

function VenueCard({ venue }) {
    const { user } = useContext(UserContext) 
    const { setBookingVenue, handleTimeFormat } = useContext(BookingContext) 
    const { name, location, occupancy, time_open, time_closed, hourly_fee } = venue
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setBookingVenue(venue)
        navigate('/vendors')
    };

    return (
        <>
            {user ? (
                <>
                <li className="card">
                    <form onSubmit={handleSubmit}>
                        <h2>{name}</h2>
                        <h4>Location:</h4>
                        <p>{location}</p>
                        <h4>Occupancy:</h4>
                        <p>{occupancy}</p>
                        <h4>Opens:</h4>
                        <p>{handleTimeFormat(time_open)}</p>
                        <h4>Closes:</h4>
                        <p>{handleTimeFormat(time_closed)}</p>
                        <h4>Rate per hour:</h4>
                        <p>${hourly_fee}</p>
                        <h4>To move forward, click 'Choose This Venue'</h4>
                        <button type='submit'>Choose This Venue</button> 
                    </form>
                </li>
                </>
            ) : (
                <>
                <li className="card">
                    <article>
                        <h2>{name}</h2>
                        <h4>Location:</h4>
                        <p>{location}</p>
                        <h4>Occupancy:</h4>
                        <p>{occupancy}</p>
                        <h4>Opens:</h4>
                        <p>{handleTimeFormat(time_open)}</p>
                        <h4>Closes:</h4>
                        <p>{handleTimeFormat(time_closed)}</p>
                        <h4>Rate per hour:</h4>
                        <p>${hourly_fee}</p>
                    </article>
                </li>
                </>
            )}
        </>
    );
}

export default VenueCard;
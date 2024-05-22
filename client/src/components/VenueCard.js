import React, { useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";

function VenueCard({ venue }) {
    const { user } = useContext(UserContext) 
    const { setBookingVenue } = useContext(BookingContext) 
    const { name, location, occupancy, time_open, time_closed, hourly_fee } = venue

    const navigate = useNavigate();

    function handleTimeFormat(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        
        const formattedHours = time.getHours() % 12 || 12;
        const formattedMinutes = time.getMinutes().toString().padStart(2, '0');
        const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        setBookingVenue(venue)
        navigate('/vendors')
    };
    

    return (
        <>
            {user ? (
                <>
                    <br />
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
                        <h4>To move forward, click choose this venue</h4>
                        <button type='submit'>Choose This Venue</button> 
                    </form>
                    <br />
                </>
            ) : (
                <>
                    <br />
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
                    <br />
                </>
            )}
        </>
    );
}

export default VenueCard;
import React, { useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";

function VenueCard({ venue }) {
    const { user } = useContext(UserContext) 
    const { setBookingVenue } = useContext(BookingContext) 
    const { name, location, occupancy, time_open, time_closed, hourly_fee } = venue

    const [isChecked, setIsChecked] = useState(false);

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

    function handleChange() {
        setIsChecked(!isChecked)
        setBookingVenue(venue)
        console.log(venue)
    }

    return (
        <>
            {user ? (
                <>
                    <br />
                    <article>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                            />
                            Select Venue
                        </label>
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
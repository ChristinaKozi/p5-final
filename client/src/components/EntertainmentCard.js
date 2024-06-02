import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";

function EntertainmentCard({ entertainment }) {
    const { user } = useContext(UserContext) 
    const { setBookingEntertainment } = useContext(BookingContext) 
    const {name, ent_type, hourly_fee} = entertainment
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setBookingEntertainment(entertainment)
        navigate('/confirmation')
    };

    return (
        <>
        {user ? (
            <>
            <li className="card">
                <form onSubmit={handleSubmit}>
                    <h2>{name}</h2>
                    <h4>Type of Entertainment:</h4>
                    <p>{ent_type}</p>
                    <h4>Rate per hour:</h4>
                    <p>${hourly_fee}</p>
                    <h4>To move forward, click 'Choose This Entertainment'</h4>
                    <button type='submit'>Choose This Entertainment</button> 
                </form>
            </li>
            </>
        ) : (
            <>
            <li className="card">
                <article>
                <h2>{name}</h2>
                    <h4>Type of Entertainment:</h4>
                    <p>{ent_type}</p>
                    <h4>Rate per hour:</h4>
                    <p>${hourly_fee}</p>
                </article>
            </li>
            </>
        )}
        </>
    )
}

export default EntertainmentCard;
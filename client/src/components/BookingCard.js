import React from "react"

function BookingCard({ booking }) {
    const { start_time, end_time, number_of_guests, venue, entertainment, vendor } = booking
    
    const start_time_date_obj = new Date(start_time);
    const end_time_date_obj = new Date(end_time);

    return (
    <>
        <br></br><br></br>
        <h4>Date:</h4>
        <p>{start_time_date_obj.toLocaleDateString()}</p>
        <h4>Start Time:</h4>
        <p>{start_time_date_obj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <h4>End Time:</h4>
        <p>{end_time_date_obj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <h4>Number of Guests:</h4>
        <p>{number_of_guests}</p>
        <h4>Venue:</h4>
        <p>{venue.name}</p>
        <h4>Vendor:</h4>
        <p>{vendor.name}</p>
        <h4>Entertainment:</h4>
        <p>{entertainment.name}</p>
        <br></br><br></br>
    </>
    )
}

export default BookingCard;
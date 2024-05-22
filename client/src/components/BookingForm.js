import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";

function BookingForm() {
    const navigate = useNavigate();
    const { date, setDate, 
        startTime, setStartTime,
        endTime, setEndTime, 
        numberOfGuests, setNumberOfGuests } = useContext(BookingContext)
  
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(date, startTime, endTime, numberOfGuests)
        navigate('/venues')
      }

    return (
        <form onSubmit={handleSubmit}>
        {/* <formfeild> */}
          <label>Date: </label>
          <input
            type='date'
            placeholder="Date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>Start Time: </label>
          <input
            type='time'
            placeholder="Start Time"
            value={startTime}
            onChange={(e)=>setStartTime(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>End Time: </label>
          <input
            type='time'
            placeholder="End Time"
            value={endTime}
            onChange={(e)=>setEndTime(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>Number of Guests: </label>
          <input
            type='number'
            placeholder="Number of guests"
            value={numberOfGuests}
            onChange={(e)=>setNumberOfGuests(e.target.value)}>
          </input>
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <button type='submit'>Create Booking</button>
        {/* </formfeild> */}
      </form>
    )
}

export default BookingForm;
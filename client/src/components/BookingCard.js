import React, { useState } from "react"
import * as yup from 'yup'
import { useFormik } from "formik";
import { headers } from "../Globals";


function BookingCard({ booking, setBookings, bookings, index }) {
    const { start_time, end_time, number_of_guests, venue, entertainment, vendor } = booking
    const [total, setTotal] = useState(booking.calculate_total_price)
    const [editing, setEditing] = useState(false)
    const [errors, setErrors] = useState([]);

    function handleEdit() {
        setEditing(true)
    }

    function handleCancelEdit() {
        setEditing(false);
    }

    function handleDeleteBooking() {
        fetch(`/bookings/${booking.id}`, {method: "DELETE"})
        .then((r)=>{
            if (r.status === 204) {
                const updatedBookings = bookings.filter((b)=> b.id !== booking.id)
                setBookings(updatedBookings)
            } else if (r.status === 404) {
                setErrors(["Booking not found"]);
            } else {
                setErrors(["Failed to delete booking"]);
            }
        })
        .catch((error) => {
            console.error("Error deleting booking:", error);
        });
    }

    function handleSubmit(values) {

        // creates datetime object for inputted date value
        const selectedDate = new Date(values.date);
        const adjustedDate = new Date(selectedDate.getTime())
        adjustedDate.setDate(selectedDate.getDate() + 1);
        
        // creates datetime object for inputted start time value
        const selectedStartTime = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), adjustedDate.getDate(), ...values.startTime.split(':'));
    
        // creates datetime object for inputted end time value
        const selectedEndTime = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), adjustedDate.getDate(), ...values.endTime.split(':'));

        // converts to UTC time zone
        const adjustedStartTime = new Date(selectedStartTime.getTime() - (selectedStartTime.getTimezoneOffset() * 60000));
        const adjustedEndTime = new Date(selectedEndTime.getTime() - (selectedEndTime.getTimezoneOffset() * 60000));
    
        const bookingData = {
            start_time: adjustedStartTime.toISOString(),
            end_time: adjustedEndTime.toISOString(),
            number_of_guests: values.numberOfGuests,
        };

        fetch(`/bookings/${booking.id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(bookingData) 
        })
        .then((r)=>{
            if (r.status === 202) {
                r.json()
                .then((b)=>{
                    setTotal(b.calculate_total_price)
                    const updatedBookings = bookings.map((b) => {
                        if (b.id === booking.id) {
                            return {
                                ...b, 
                                start_time: selectedStartTime, 
                                end_time: selectedEndTime,
                                number_of_guests: values.numberOfGuests,
                                
                            };
                        } else {
                            return b;
                        }
                    });
                    setBookings(updatedBookings);
                    setEditing(false);
                })
            } else {
                r.json()
                .then((data)=> {
                    if (data.error) {
                        setErrors([data.error])
                    } else {
                        setErrors(data.errors);
                    }
                });

            }
        })
        .catch((error) => {
            console.error("Error updating booking", error);
        });
    }

    const schema = yup.object({
        date: yup.date().min(new Date(), "Date must be after the today's date"),
        startTime: yup.string(),
        endTime: yup.string(),
        numberOfGuests: yup.number().positive(),
      })
  
      const formik = useFormik({
        initialValues: {
          date: '',
          startTime: '',
          endTime: '',
          numberOfGuests: '',
        },
        validationSchema: schema,
        onSubmit: handleSubmit
      })
  
      const displayErrors = (error) => {
          return error ? <p style={{ color: "red" }}>{ error }</p> : null;
      }

    return (
    <>
        <br></br><br></br>
        {editing ? (
            <>
            <li className="card">
            <form onSubmit={formik.handleSubmit} >
            <h3>My Booking: {index+1}</h3>
                <h4>Date:</h4>
                <input 
                    id='date'
                    type='date'
                    placeholder="Date"
                    value={formik.values.date}
                    onChange={ formik.handleChange } />
                { displayErrors(formik.errors.date) }
                <h4>Start Time:</h4>
                <input
                    id='startTime'
                    type='time'
                    placeholder="Start Time"
                    value={formik.values.startTime}
                    onChange={ formik.handleChange }>
                </input>
                { displayErrors(formik.errors.startTime) }
                <h4>End Time:</h4>
                <input
                    id='endTime'
                    type='time'
                    placeholder="End Time"
                    value={formik.values.endTime}
                    onChange={ formik.handleChange }>
                </input>
                { displayErrors(formik.errors.endTime) }
                <h4>Number of Guests:</h4>
                <input
                    id='numberOfGuests'
                    type='number'
                    placeholder="Number of guests"
                    value={formik.values.numberOfGuests}
                    onChange={ formik.handleChange }>
                </input>
                { displayErrors(formik.errors.numberOfGuests) }
                {venue !== null? (
                <>
                <h4>Venue:</h4>
                <p>{venue.name}</p>
                </>
                ) : (null)}
                {vendor !== null? (
                <>
                <h4>Vendor:</h4>
                <p>{vendor.name}</p>
                </>
                ) : (null)}
                {entertainment !== null? (
                <>
                <h4>Entertainment:</h4>
                <p>{entertainment.name}</p>
                </>
                ) : (null)}
                <button type='submit'>Save</button> &nbsp;
                <button onClick={handleCancelEdit}>Cancel</button>
            </form>
            {errors.map((err)=>(
                    <p key={err}>{err}</p>
                ))}
            </li>
            </>
        ) : (
            <>
            <li className="card">
                <h3>My Booking: {index+1}</h3>
                <h4>Date:</h4>
                <p>{new Date(start_time).toLocaleDateString()}</p>
                <h4>Start Time:</h4>
                <p>{new Date(start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>End Time:</h4>
                <p>{new Date(end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>Number of Guests:</h4>
                <p>{number_of_guests}</p>
                {venue !== null? (
                <>
                <h4>Venue:</h4>
                <p>{venue.name}</p>
                </>
                ) : (null)}
                {vendor !== null? (
                <>
                <h4>Vendor:</h4>
                <p>{vendor.name}</p>
                </>
                ) : (null)}
                {entertainment !== null? (
                <>
                <h4>Entertainment:</h4>
                <p>{entertainment.name}</p>
                </>
                ) : (null)}
                <h4>Total Fee:</h4>
                <p>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <button onClick={handleEdit}>Edit</button> &nbsp;
                <button onClick={handleDeleteBooking}>Delete</button>
                {errors.map((err)=>(
                    <p key={err}>{err}</p>
                ))}
            </li>
            </>)}
        <br></br><br></br>
    </>
    )
}

export default BookingCard;
import React,{ useState } from "react"
import * as yup from 'yup'
import { useFormik } from "formik";
import { headers } from "../Globals";

function BookingCard({ booking, setBookings, bookings }) {
    const { start_time, end_time, number_of_guests, venue, entertainment, vendor } = booking
    const [editing, setEditing] = useState(false)

    // const start_time_date_obj = new Date(start_time);
    // const end_time_date_obj = new Date(end_time);


    function handleEdit() {
        setEditing(true)
    }

    function handleCancelEdit() {
        setEditing(false);
    }

    function handleDeleteReview() {
        fetch(`/bookings/${booking.id}`, {method: "DELETE"})
        .then((r)=>{
            if (r.status === 204) {
                const updatedBookings = bookings.filter((b)=> b.id !== booking.id)
                setBookings(updatedBookings)
            } else {
                console.error("Failed to delete booking")
            }
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
    }

    function handleSubmit(values) {
        const selectedDate = new Date(values.date);
        const selectedStartTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), ...values.startTime.split(':'));
        const selectedEndTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), ...values.endTime.split(':'));

        const bookingData = {
            start_time: selectedStartTime.toISOString(),
            end_time: selectedEndTime.toISOString(),
            number_of_guests: values.numberOfGuests,
        }

        fetch(`/bookings/${booking.id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(bookingData) 
        })
        .then((r)=>{
            if (r.status === 202) {
                return r.json()
            }
        })
        .then(()=>{
            const updatedBookings = bookings.map((b)=>{
                if (b.id === booking.id) {
                    return {...b, date: selectedDate, startTime: selectedStartTime, endTime: selectedEndTime }
                } else {
                    return b
                }
            })
            setBookings(updatedBookings)
            setEditing(false)
        })
        .catch((error) => {
            console.error("Error updating booking", error);
        });
    }

    const schema = yup.object({
        date: yup.date().min(new Date(), "Date must be after the today's date").required(),
        startTime: yup.string().required(),
        endTime: yup.string().required(),
        numberOfGuests: yup.number().positive().required()
      })
  
      const formik = useFormik({
        initialValues: {
          date: "",
          startTime: "",
          endTime: "",
          numberOfGuests: ""
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
            <form onSubmit={formik.handleSubmit} >
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
                <h4>Venue:</h4>
                <p>{venue.name}</p>
                <h4>Vendor:</h4>
                <p>{vendor.name}</p>
                <h4>Entertainment:</h4>
                <p>{entertainment.name}</p>
                <button type='submit'>Save</button> &nbsp;
                <button onClick={handleCancelEdit}>Cancel</button>
            </form>
            </>
        ) : (
            <>
                <h4>Date:</h4>
                <p>{new Date(start_time).toLocaleDateString()}</p>
                <h4>Start Time:</h4>
                <p>{new Date(start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>End Time:</h4>
                <p>{new Date(end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <h4>Number of Guests:</h4>
                <p>{number_of_guests}</p>
                <h4>Venue:</h4>
                <p>{venue.name}</p>
                <h4>Vendor:</h4>
                <p>{vendor.name}</p>
                <h4>Entertainment:</h4>
                <p>{entertainment.name}</p>
                <button onClick={handleEdit}>Edit</button> &nbsp;
                <button onClick={handleDeleteReview}>Delete</button>
            </>)}
        <br></br><br></br>
    </>
    )
}

export default BookingCard;
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../contexts/BookingContext";
import * as yup from 'yup'
import { useFormik } from "formik";

function BookingForm() {
    const navigate = useNavigate();
    const { date, setDate, startTime, setStartTime, endTime, setEndTime, numberOfGuests, setNumberOfGuests } = useContext(BookingContext)
  
    function handleSubmit(values) {
      const selectedDate = new Date(values.date);
      const adjustedDate = new Date(selectedDate.getTime())
      adjustedDate.setDate(selectedDate.getDate() + 1);
 
      const selectedStartTime = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), adjustedDate.getDate(), ...values.startTime.split(':'));
      const selectedEndTime = new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), adjustedDate.getDate(), ...values.endTime.split(':'));

      setDate(adjustedDate);
      setStartTime(selectedStartTime);
      setEndTime(selectedEndTime);
      setNumberOfGuests(values.numberOfGuests)
      navigate('/venues')
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
        numberOfGuests: "",
      },
      validationSchema: schema,
      onSubmit: handleSubmit
    })

    const displayErrors = (error) => {
        return error ? <p style={{ color: "red" }}>{ error }</p> : null;
    }

    return (
      <form onSubmit={formik.handleSubmit}>
        {/* <formfeild> */}
          <label>Date: </label>
          <input
            id='date'
            type='date'
            placeholder="Date"
            value={formik.values.date}
            onChange={ formik.handleChange }>
          </input>
          { displayErrors(formik.errors.date) }
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>Start Time: </label>
          <input
            id='startTime'
            type='time'
            placeholder="Start Time"
            value={formik.values.startTime}
            onChange={ formik.handleChange }>
          </input>
          { displayErrors(formik.errors.startTime) }
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>End Time: </label>
          <input
            id='endTime'
            type='time'
            placeholder="End Time"
            value={formik.values.endTime}
            onChange={ formik.handleChange }>
          </input>
          { displayErrors(formik.errors.endTime) }
        {/* </formfeild> */}
        <br />
        <br />
        {/* <formfeild> */}
          <label>Number of Guests: </label>
          <input
            id='numberOfGuests'
            type='number'
            placeholder="Number of guests"
            value={formik.values.numberOfGuests}
            onChange={ formik.handleChange }>
          </input>
          { displayErrors(formik.errors.numberOfGuests) }
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
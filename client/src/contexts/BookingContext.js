import { createContext, useState } from "react"

const BookingContext = createContext({})

const BookingProvider = ({ children }) => {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState('')
    const [bookingVenue, setBookingVenue] = useState(null)
    const [bookingVendor, setBookingVendor] = useState('')
    const [bookingEntertainment, setBookingEntertainment] = useState('')

    return <BookingContext.Provider value={{ 
        date, setDate, 
        startTime, setStartTime, 
        endTime, setEndTime, 
        numberOfGuests, setNumberOfGuests,
        bookingVenue, setBookingVenue,
        bookingVendor, setBookingVendor,
        bookingEntertainment, setBookingEntertainment
        }}>
        { children }
    </BookingContext.Provider>
}

export { BookingContext, BookingProvider };

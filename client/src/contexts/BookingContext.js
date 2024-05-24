import { createContext, useState } from "react"

const BookingContext = createContext({})

const BookingProvider = ({ children }) => {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState('')
    const [bookingVenue, setBookingVenue] = useState({})
    const [bookingVendor, setBookingVendor] = useState({})
    const [bookingEntertainment, setBookingEntertainment] = useState({})

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

    return <BookingContext.Provider value={{ 
        date, setDate, 
        startTime, setStartTime, 
        endTime, setEndTime, 
        numberOfGuests, setNumberOfGuests,
        bookingVenue, setBookingVenue,
        bookingVendor, setBookingVendor,
        bookingEntertainment, setBookingEntertainment,
        handleTimeFormat
        }}>
        { children }
    </BookingContext.Provider>
}

export { BookingContext, BookingProvider };

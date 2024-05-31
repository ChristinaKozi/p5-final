import { createContext, useState, useEffect } from "react"

const BookingContext = createContext({})

const BookingProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState('')
    const [bookingVenue, setBookingVenue] = useState({})
    const [bookingVendor, setBookingVendor] = useState({})
    const [bookingEntertainment, setBookingEntertainment] = useState({})
    const [totalFee, setTotalFee] = useState(0)

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem("booking"));
        if (storedData) {
            setDate(new Date(storedData.date) || '');
            setStartTime(new Date(storedData.startTime) || '');
            setEndTime(new Date(storedData.endTime) || '');
            setNumberOfGuests(storedData.numberOfGuests || '');
            setBookingVenue(storedData.bookingVenue || {});
            setBookingVendor(storedData.bookingVendor || {});
            setBookingEntertainment(storedData.bookingEntertainment || {});
            setTotalFee(storedData.totalFee || 0);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const bookingData = {
            "date": date,
            "startTime" :startTime,
            "endTime": endTime,
            "numberOfGuests" :numberOfGuests,
            "bookingVenue":bookingVenue,
            "bookingVendor": bookingVendor,
            "bookingEntertainment" : bookingEntertainment,
        };

        // Store the booking data in sessionStorage
        sessionStorage.setItem("booking", JSON.stringify(bookingData));
        setLoading(false);
    }, [date, startTime, endTime, numberOfGuests, bookingVenue, bookingVendor, bookingEntertainment]);
    

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
        totalFee, setTotalFee,
        handleTimeFormat
        }}>
        {loading ? null : children}
    </BookingContext.Provider>
}

export { BookingContext, BookingProvider };

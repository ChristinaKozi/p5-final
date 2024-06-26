import React, { useContext, useEffect, useState } from "react"
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import BookingCard from "../components/BookingCard";

function UserProfile() {
    const { user } = useContext(UserContext)
    const [bookings, setBookings] = useState([])
    const [errors, setErrors] = useState([]);
    
    useEffect(()=>{
        if (!user) {
            return
        }

        fetch(`/bookings`)
        .then((r)=>{
            if (r.status === 200){
                r.json().then(bookings=>{
                    if (user) {
                        setBookings(bookings)
                    }
                })
            } else {
                r.json().then((data)=> {
                    if (data.error) {
                        setErrors([data.error])
                    } else {
                        setErrors(data.errors);
                    }
                });
            }
        })
    },[user])

    useEffect(() => {
        const filteredBookings = bookings.filter((booking)=>booking.user_id === user.id)
        
        const bookingList = filteredBookings.map((booking, index)=>{
            return (
            <BookingCard key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings} index={index}>
            </BookingCard>
            );
        });

        setBookingList(bookingList); 
    }, [bookings, user])

    const [bookingList, setBookingList] = useState([]); 

    return (
        <>
        <header>
            <NavBar />
        </header>
        <div className="header">
        <h1>User Profile</h1>
        {user ? <h2>{user.username}'s events:</h2>: <h2>No user</h2>}
        </div>
        <li className="cards">
            {user && bookings !== null ? bookingList : <h2 style = {{ textAlign: 'center' }}>No bookings</h2>}
            {errors.map((err)=>(
                    <p key={err}>{err}</p>
            ))}
        </li>
        </>
    )
};

export default UserProfile;
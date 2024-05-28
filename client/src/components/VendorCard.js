import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { BookingContext } from "../contexts/BookingContext";

function VendorCard({ vendor }) {
    const { user } = useContext(UserContext) 
    const { setBookingVendor } = useContext(BookingContext) 
    const { name, per_person_fee, vendor_type } = vendor
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        setBookingVendor(vendor)
        navigate('/entertainment')
    };

    return (
    <>
        {user ? (
            <>
                <br />
                <form onSubmit={handleSubmit}>
                    <h2>{name}</h2>
                    <h4>Vendor Type:</h4>
                    <p>{vendor_type}</p>
                    <h4>Fee Per Person:</h4>
                    <p>${per_person_fee}</p>
                    <h4>To move forward, click 'Choose This Vendor'</h4>
                    <button type='submit'>Choose This Vendor</button> 
                </form>
                <br />
            </>
        ) : (
            <>
                <br />
                <article>
                    <h2>{name}</h2>
                    <h4>Vendor Type:</h4>
                    <p>{vendor_type}</p>
                    <h4>Fee Per Person:</h4>
                    <p>${per_person_fee}</p>
                </article>
                <br />
            </>
        )}
    </>
    )
}

export default VendorCard;
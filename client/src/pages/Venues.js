import React, { useEffect, useState } from "react"
import NavBar from "../components/NavBar";
import VenueCard from "../components/VenueCard";
import { useNavigate } from "react-router-dom";

function Venues() {
    const [venues, setVenues] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/venues')
        .then((r)=>r.json())
        .then(venues=>{setVenues(venues)})
        }, [])

    const venuesList = venues.map(venue=>{
        return <VenueCard key={venue.id} venue={venue}/>
    })

    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>Venues</h1>
            <h4>Please select 1 venue from the list below</h4>
            {venuesList}
            <button onClick= {()=>{navigate('/vendors')}}> Next </button>
        </>
    )
};

export default Venues;

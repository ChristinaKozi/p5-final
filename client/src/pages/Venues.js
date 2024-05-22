import React, { useEffect, useState } from "react"
import NavBar from "../components/NavBar";
import VenueCard from "../components/VenueCard";

function Venues() {
    const [venues, setVenues] = useState([])

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
        </>
    )
};

export default Venues;

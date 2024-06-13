import React, { useEffect, useState } from "react"
import NavBar from "../components/NavBar";
import VenueCard from "../components/VenueCard";
import { useNavigate } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { setDefaults, geocode, RequestType } from "react-geocode"
import '../css/index.css'

function Venues({ google }) {
    const [venues, setVenues] = useState([])
    const [markers, setMarkers] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/venues')
        .then((r)=>r.json())
        .then(venues=>{setVenues(venues)})
    }, [])

    const venuesList = venues.map(venue => (
        <VenueCard key={venue.id} venue={venue} />
    ));

    const venueAddressList = venues.map(venue => venue.location);  

    useEffect(() => {
        setDefaults({
            key: "AIzaSyDrI74TE84KxBVp4dHd8Zlid00GXPxK07Y",
            language: "en",
            region: "es",
        });
        
        const geocodePromises = venueAddressList.map(address => {
            return geocode(RequestType.ADDRESS, address)
                .then(response => {
                    if (response.results && response.results.length > 0) {
                        const { lat, lng } = response.results[0].geometry.location;
                        return { lat, lng };
                    } else {
                        return null; 
                    }
                })
                .catch(error => {
                    console.error('Error geocoding address:', address, error);
                    return null;
                });
        });

        Promise.all(geocodePromises)
            .then(responses => {
                const validResponses = responses.filter(response => response !== null);
                const markers = validResponses.map((response, index) => (
                    <Marker
                        key={index}
                        position={response}
                    />
                ));
                setMarkers(markers);
            })
            .catch(error => {
                console.error('Error geocoding addresses:', error);
            });
    }, [venues]);   
    
    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className="header">
                <h1>Venues</h1>
                <h4>Please select 1 venue from the list below</h4>
            </div>
            <div className="map">
                <Map
                    google={google}
                    style={{ width: '100%', height: '400px' }}
                    initialCenter={{
                        lat: 39.8283, 
                        lng: -98.5795
                    }}
                    zoom={4}
                >
                    {markers}
                </Map>
            </div>
            <ul className="cards" style={{ marginTop: '400px' }}>{venuesList}</ul>
            <div style={{ textAlign: 'right' }}>
                <button onClick= {()=>{navigate('/vendors')}}> Next </button>
            </div>
        </>
    )
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDrI74TE84KxBVp4dHd8Zlid00GXPxK07Y")
}) (Venues);

import React, { useState, useEffect } from "react"
import NavBar from "../components/NavBar";
import VendorCard from "../components/VendorCard";
import { useNavigate } from "react-router-dom";

function Vendors() {
    const [vendors, setVendors] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/vendors')
        .then((r)=>r.json())
        .then(vendors=>{setVendors(vendors)})
        }, [])

    const vendorsList = vendors.map(vendor=>{
        return <VendorCard key={vendor.id} vendor={vendor}/>
    })

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className="header">
                <h1>Vendors</h1>
                <h4>Please select 1 vendor from the list below</h4>
            </div>
            <ul className="cards">{vendorsList}</ul>
            <div style={{ textAlign: 'right' }}>
            <button onClick= {()=>{navigate('/entertainment')}}> Next </button>
            </div>
            <br></br>
        </>
        )
};

export default Vendors;

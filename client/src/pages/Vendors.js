import React, { useState, useEffect, useContext } from "react"
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import VendorCard from "../components/VendorCard";

function Vendors() {
    const [vendors, setVendors] = useState([])

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
            <h1>Vendors</h1>
            <h4>Please select 1 vendor from the list below</h4>
            {vendorsList}
        </>
        )
};

export default Vendors;

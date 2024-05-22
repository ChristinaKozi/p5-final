import React, { useState, useEffect, useContext } from "react"
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

function Vendors() {
    const [vendors, setVendors] = useState([])

    useEffect(()=>{
        fetch('/vendors')
        .then((r)=>r.json())
        .then(vendors=>{setVendors(vendors)})
        }, [])

    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>Vendors</h1>
        </>
        )
};

export default Vendors;

import React,{ useState, useEffect } from "react"
import NavBar from "../components/NavBar";
import EntertainmentCard from "../components/EntertainmentCard";
import { useNavigate } from "react-router-dom";

function Entertainment() {
    const [entertainments, setEntertainments] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/entertainments')
        .then((r)=>r.json())
        .then(entertainments=>{setEntertainments(entertainments)})
        }, [])

    const entertainmentsList = entertainments.map(entertainment=>{
        return <EntertainmentCard key={entertainment.id} entertainment={entertainment}/>
    })

    return (
    <>
        <header>
            <NavBar />
        </header>
        <div className="header">
            <h1>Entertainment</h1>
            <h4>Please select 1 type of entertainment from the list below</h4>
        </div>
        <ul className="cards">{entertainmentsList}</ul>
        <div style={{ textAlign: 'right' }}>
            <button onClick= {()=>{navigate('/confirmation')}}> Next </button>
        </div>
    </>
    )
};

export default Entertainment;
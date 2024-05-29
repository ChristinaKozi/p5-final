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
        <h1>Entertainment</h1>
        {entertainmentsList}
        <button onClick= {()=>{navigate('/confirmation')}}> Next </button>
    </>
    )
};

export default Entertainment;
import React,{ useState, useEffect } from "react"
import NavBar from "../components/NavBar";
import EntertainmentCard from "../components/EntertainmentCard";

function Entertainment() {
    const [entertainments, setEntertainments] = useState([])

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
    </>
    )
};

export default Entertainment;
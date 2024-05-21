import React, { useContext } from "react"
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";

function UserProfile() {
    const { user } = useContext(UserContext)
    console.log(user)

    return (
        <>
            <header>
                <NavBar />
            </header>
            <h1>User Profile</h1>
            {<h2>{user.username}'s events:</h2>}
        </>
    )
};

export default UserProfile;
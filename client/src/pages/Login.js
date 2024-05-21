import React, {useContext, useState} from "react"
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import App from "./App";
import { UserContext } from "../contexts/UserContext";

function Login() {
    const { user } = useContext(UserContext)
    const [showLogin, setShowLogin] = useState(true);
    
    if (user) return <App />;

    return (
        <>
            <header>
                <NavBar />
            </header>
            {showLogin ? (
                <>
                <h2>Login</h2>
                <LoginForm />
                <p>
                  Don't have an account? &nbsp;
                  <button onClick={() => setShowLogin(false)}>
                    Sign Up
                  </button>
                </p>
                </>
            ) : (
            <>
                <h2>Create Account</h2>
                <SignUpForm />
                <p>
                  Already have an account? &nbsp;
                  <button onClick={() => setShowLogin(true)}>
                    Log In
                  </button>
                </p>
            </>
            )
            }
        </>
        )
}

export default Login;

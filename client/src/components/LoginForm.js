import React, { useState, useContext } from "react"
import * as yup from 'yup'
import { useFormik } from "formik";
import { headers } from "../Globals";
import { UserContext } from "../contexts/UserContext";

function LoginForm() {
    const { setUser } = useContext(UserContext)

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(values) {
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values),
        })
        .then((r)=> {
            setIsLoading(false);
            if (r.status === 200) {
                r.json()
                .then(user=>{setUser(user)})
            } else {
                r.json()
                .then((data)=> {
                    if (data.error) {
                        setErrors([data.error])
                    } else {
                        setErrors(data.errors);
                    }
                });
            }
        })
    }

    const schema = yup.object({
        username: yup.string().min(3).required(),
        password: yup.string().required().matches(/\d/, 'Password must contain at least one number')
    })
        
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: handleSubmit
    })
 
    const displayErrors = (error) => {
        return error ? <p style={{ color: "red" }}>{ error }</p> : null;
    }

    return (
        <div className='login'>
            <form onSubmit={ formik.handleSubmit }>
                <label>Username:</label>
                <input
                    type='text'
                    id='username'
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={ formik.handleChange }>
                </input>
                { displayErrors(formik.errors.username) }
                <br />
                <br />
                <label>Password:</label>
                <input
                    type='password'
                    id='password'
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={ formik.handleChange }>
                </input>
                { displayErrors(formik.errors.password) }
                <br />
                <br />
                <button type='submit'>{isLoading ? "Loading..." : "Log in"}</button>
                {errors.map((err)=>(
                    <p key={err}>{err}</p>
                ))}
            </form>
        </div>
    )
}

export default LoginForm;
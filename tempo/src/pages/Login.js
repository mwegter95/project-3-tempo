import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
    const [formState, setFormState] = useState({ email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState("");
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(formState);

        const email = document.getElementById("email").value.length;
        const password = document.getElementById("password").value.length;

        if(!email || !password) {
            setErrorMessage("Both entries are required.");
        } else {
            setErrorMessage("");
            try {
                const { data } = await login({
                    variables: { ...formState }
                });
                Auth.login(data.login.token);
            } catch(e) {
                console.error(e);
            }
        }

    }

    return (
        <section className="sign-on">
            <form onSubmit={handleLogin} autoComplete="off">
                <h1 className="sans-serif white para">Welcome back.</h1>
                {errorMessage && <p className="serif sm gold">{errorMessage}</p>}
                
                <label htmlFor="email" className="sans-serif white subpara">Email:</label>
                <input id="email" name="email" type="email" className="sans-serif sm" onChange={handleChange} />
                
                <label htmlFor="password" className="sans-serif white subpara">Password:</label>
                <input id="password" name="password" type="password" className="sans-serif sm" onChange={handleChange} />

                <button type="submit" className="sans-serif sm">Submit</button>
                {error && <div className="serif sm gold">Login failed.</div>}
            </form>
        </section>
    )
}

export default Login;
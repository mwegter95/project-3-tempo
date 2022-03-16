import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Dashboard = () => {
    const [formState, setFormState] = useState({ email: "", password: ""});
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

        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.login.token);
        } catch(e) {
            console.error(e);
        }

    }

    return (
        <section className="sign-on">
            <form onSubmit={handleLogin}>
                <h1 className="sans-serif white para">This is the dashboard placeholder page. You'll notice it's the same as the login right now</h1>
                
                <label htmlFor="email" className="sans-serif white subpara">Email:</label>
                <input name="email" type="email" className="sans-serif sm" onChange={handleChange} />
                
                <label htmlFor="password" className="sans-serif white subpara">Password:</label>
                <input name="password" type="password" className="sans-serif sm" onChange={handleChange} />

                <button type="submit" className="sans-serif sm">Submit</button>

                {error && <div>Log in failed.</div>}
            </form>
        </section>
    )
}

export default Dashboard;
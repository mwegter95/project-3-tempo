import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState(
        { 
            username: "", 
            email: "", 
            password: "",
            biography: "",
            status: "",
            type: ""
        }
    );
    const [addUser, { error }] = useMutation(ADD_USER);

    const [pageState, setPageState] = useState(1);
    const [radio1State, setRadio1State] = useState(false);
    const [radio2State, setRadio2State] = useState(false);

    // update state based on form input changes
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleRadio1Change = event => {
        const choice = event.target.checked;
        setRadio1State(choice);
    };

    const handleRadio2Change = event => {
        const choice = event.target.checked;
        setRadio2State(choice);
    };

    const handleUserSignup = async event => {
        event.preventDefault();
        if(radio1State) {
            formState.type = "musician"
        } else if(radio2State) {
            formState.type = "band"
        }
        
        try {
            const { data } = await addUser({
                variables: {...formState}
            });
            Auth.loggedIn(data.addUser.token);
        } catch(e) {
            console.error(e);
        }
    };

    const handleUserUpdate = async event => {
        event.preventDefault();
    };

    return (
        <section className="sign-on">
            {pageState === 1 && 
                <form onSubmit={handleUserSignup}>
                    <div>
                        <h1 className="sans-serif white para">Start your journey here.</h1>
                        
                        <label htmlFor="username" className="sans-serif white subpara">Username:</label>
                        <input name="username" type="username" className="sans-serif sm" onChange={handleChange} />
                        
                        <label htmlFor="email" className="sans-serif white subpara">Email:</label>
                        <input name="email" type="email" className="sans-serif sm" onChange={handleChange} />
                        
                        <label htmlFor="password" className="sans-serif white subpara">Password:</label>
                        <input name="password" type="password" className="sans-serif sm" onChange={handleChange} />
                    </div>

                    <h1 className="sans-serif white para">Are you a...</h1>


                    <div className="radio-div">
                        <input type="radio" name="type"  value="musician" checked={radio1State} onChange={handleRadio1Change} />
                        <label htmlFor="musician" className="sans-serif white subpara">Musician</label>
                    </div>
                    
                    <div className="radio-div">
                        <input type="radio" name="type"  value="musician" checked={radio2State} onChange={handleRadio2Change} />
                        <label htmlFor="band" className="sans-serif white subpara">Band</label>
                    </div>
 

                    <button type="submit" className="sans-serif sm">Sign Up</button>
                    {error && <div>Sign up failed.</div>}
                </form>
            }

            {pageState === 2 &&
                <form onSubmit={handleUserUpdate}>
                    <h1 className="sans-serif white para">Tell us about you.</h1>
                </form>
            }

        </section>
    )
}

export default Signup;
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

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
    const [typeState, setTypeState] = useState("");
    const [pageState, setPageState] = useState(1);

    // update state based on form input changes
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleTypeChange = event => {
        const chosenType = event.target.value;
        console.log(chosenType);

        setTypeState(chosenType);
        console.log(typeState);
    }

    const handleUserSignup = async event => {
        event.preventDefault();
        console.log(formState);

    }

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
                        <input type="radio" name="type"  value="musician" checked={typeState === "musician"} onChange={handleTypeChange} />
                        <label htmlFor="musician" className="sans-serif white subpara">Musician</label>
                    </div>
                    
                    <div className="radio-div">
                        <input type="radio" name="type"  value="musician" checked={typeState === "band"} onChange={handleTypeChange} />
                        <label htmlFor="band" className="sans-serif white subpara">Band</label>
                    </div>
 

                    <button type="submit" className="sans-serif sm">Sign Up</button>
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
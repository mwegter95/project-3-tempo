import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState(
        { 
            email: "", 
            password: "",
            username: "",
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

    // updates the Users type property based on the checked radios
    const handleRadio1Change = event => {
        const choice = event.target.checked;
        setRadio1State(choice);
    };
    const handleRadio2Change = event => {
        const choice = event.target.checked;
        setRadio2State(choice);
    };

    // changes to the next page in the form based on Users type choice
    const changeForm = (event) => {
        event.preventDefault();

        if(radio1State) {
            formState.type = "Musician"
        } else if(radio2State) {
            formState.type = "Band"
        }

        setPageState(2);
    };

    const handleUserSignup = async (event) => {
        event.preventDefault();
        console.log(formState);
        
        try {
            const { data } = await addUser({
                variables: {...formState}
            });
            Auth.login(data.addUser.token);
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

                    <button onClick={changeForm} className="sans-serif sm">Submit</button>
                </form>
            }

            {pageState === 2 && radio1State && 
                <form onSubmit={handleUserUpdate}>
                    <h1 className="sans-serif white para">Tell us about you.</h1>

                    <label htmlFor="username" className="sans-serif white subpara">Your stage name:</label>
                    <input name="username" type="username" className="sans-serif sm" onChange={handleChange} />
                    
                    <label htmlFor="biography" className="sans-serif white subpara">Create your own bio:</label>
                    <textarea name="biography" type="biography" className="sans-serif sm" maxLength="280" onChange={handleChange}></textarea>

                    <label htmlFor="status" className="sans-serif white subpara">What's your current status?:</label>
                    <select name="status" onChange={handleChange} className="sans-serif sm">
                        <option hidden disabled selected defaultValue> -- select an option -- </option>
                        <option value="Looking for collaborations">Looking for collaborations.</option>
                        <option value="Wanting to join a band">Wanting to join a band.</option>
                        <option value="Just browsing">Just browsing.</option>
                    </select>
                    
                    <button type="submit" onClick={handleUserSignup} className="sans-serif sm">Sign up</button>

                    {error && <div>Sign up failed.</div>}
                </form>
            }

            {pageState === 2 && radio2State && 
                <form onSubmit={handleUserUpdate}>
                    <h1 className="sans-serif white para">Tell us about you.</h1>
                    
                    <label htmlFor="username" className="sans-serif white subpara">Your band name:</label>
                    <input name="username" type="username" className="sans-serif sm" onChange={handleChange} />

                    <label htmlFor="biography" className="sans-serif white subpara">Create your band's bio:</label>
                    <textarea name="biography" type="biography" className="sans-serif sm" maxLength="280" onChange={handleChange}></textarea>

                    <label htmlFor="status" className="sans-serif white subpara">What's your current status?:</label>
                    <select name="status" onChange={handleChange} className="sans-serif sm">
                        <option hidden disabled selected defaultValue> -- select an option -- </option>
                        <option value="Open for a new member">Open for a new member.</option>
                        <option value="Wanting to network with other bands">Wanting to network with other bands.</option>
                        <option value="Just browsing">Just browsing.</option>
                    </select>
                    
                    <button type="submit" onClick={handleUserSignup} className="sans-serif sm">Sign up</button>

                    {error && <div>Sign up failed.</div>}
                </form>
            }

        </section>
    )
}

export default Signup;
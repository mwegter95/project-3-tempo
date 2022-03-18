import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

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
    const [errorMessage, setErrorMessage] = useState("");
    const [messageState, setMessageState] = useState(280);

    const [pageState, setPageState] = useState(1);
    const [radio1State, setRadio1State] = useState(false);
    const [radio2State, setRadio2State] = useState(false);

    const messageLimit = (event) => {
        let currentLength = event.target.value.length;
        setMessageState(280 - currentLength);
    };

    const handleChange = (event) => {
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
    const checkRadios = (event) => {
        event.preventDefault();

        if(!radio1State && !radio2State) {
            setErrorMessage("Please choose an account type.")
        } else {
            if(radio1State) {
                formState.type = "Musician"
            } else if(radio2State) {
                formState.type = "Band"
            }
            changePage();
        }
    };

    // validate user input before changing page
    const changePage = () => {
        const email = document.getElementById("email").value;
        const isValid = validateEmail(email);
        // validate user email with a query
        if(!isValid) {
            setErrorMessage("Please enter a valid email.");
            // check if email exists
        } else {
            setErrorMessage("");

            // validate user password
            const password = document.getElementById("password").value.length;
            if(!password) {
                setErrorMessage("Please enter a password.");
            } else if(password < 8) {
                setErrorMessage("Password must be at least 8 characters.");
            } else {
                setErrorMessage("");
                setPageState(2);
            }
        }
    };

    const handleUserSignup = async (event) => {
        event.preventDefault();
        
        const username = document.getElementById("username").value.length;
        if(!username) {
            setErrorMessage("Please enter stage name");
        } else {
            setErrorMessage("");
            try {
                const { data } = await addUser({
                    variables: {...formState}
                });
                Auth.login(data.addUser.token);
            } catch(e) {
                console.error(e);
            }
        }
    };

    return (
        <section className="sign-on">
            {pageState === 1 && 
                <form onSubmit={handleUserSignup} autoComplete="off">
                    <div>
                        <h1 className="sans-serif white para">Start your journey here.</h1>
                        {errorMessage && <p className="serif sm gold">{errorMessage}</p>}
                        
                        <label htmlFor="email" className="sans-serif white subpara">Email:</label>
                        <input id="email" name="email" type="email" className="sans-serif sm" onBlur={handleChange} />
                        
                        <label htmlFor="password" className="sans-serif white subpara">Password:</label>
                        <input id="password" name="password" type="password" className="sans-serif sm" onBlur={handleChange} />
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

                    <button onClick={checkRadios} className="sans-serif sm">Submit</button>
                </form>
            }

            {pageState === 2 && 
                <form onSubmit={handleUserSignup} autoComplete="off">
                    <h1 className="sans-serif white para">Tell us about you.</h1>
                    {errorMessage && <p className="serif sm gold">{errorMessage}</p>}

                    {radio1State && <label htmlFor="username" className="sans-serif white subpara">Your stage name:</label>}
                    {radio2State && <label htmlFor="username" className="sans-serif white subpara">Your band name:</label>}
                    <input id="username" name="username" type="username" className="sans-serif sm" onBlur={handleChange} />
                    
                    {radio1State && <label htmlFor="biography" className="sans-serif white subpara">Create your own bio:</label>}
                    {radio2State && <label htmlFor="biography" className="sans-serif white subpara">Create your band's bio:</label>}
                    <textarea name="biography" type="biography" className="sans-serif sm" maxLength="280" onChange={messageLimit} onBlur={handleChange}></textarea>
                    <p className="serif gold regular">{messageState} characters left.</p>

                    <label htmlFor="status" className="sans-serif white subpara">What's your current status?:</label>
                    <select name="status" onBlur={handleChange} className="sans-serif sm" defaultValue="-- select an option --">
                            <option disabled value="-- select an option --"> -- select an option -- </option>
                        {radio1State &&
                            <>
                                <option value="Looking for collaborations">Looking for collaborations.</option>
                                <option value="Wanting to join a band">Wanting to join a band.</option>
                            </>
                        }
                        {radio2State && 
                            <>
                                <option value="Open for a new member">Open for a new member.</option>
                                <option value="Wanting to network with other bands">Wanting to network with other bands.</option>
                            </>
                        }
                            <option value="Just browsing">Just browsing.</option>

                    </select>
                    
                    <button type="submit" className="sans-serif sm">Sign up</button>

                    {error && <div className="serif sm gold">Sign up failed.</div>}
                </form>
            }
        </section>
    )
}

export default Signup;
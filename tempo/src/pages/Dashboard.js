import React, { useState } from "react";
import { Redirect, useParams } from 'react-router-dom';

import { useQuery, useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import { ADD_MUSIC } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";

import GenreList from "../components/GenreList"
import InstrumentList from "../components/InstrumentList"

import Auth from "../utils/auth";

const Dashboard = (props) => {

    const { loading, data } = useQuery(QUERY_ME);
    

    const user = data?.me.username;

    // redirect to personal page if username is yours
    // this part is not necessary if we have separate pages for dashboard (logged in user) and profile (viewing other user). 
    if (Auth.loggedIn() && Auth.getProfile().data.username === user) {
        return <Redirect to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    

    return (
        <> 
        {user === "Oil Refinery" ? 
            <section className="user-dashboard">
                {/* make a dashboard that is a mix of components */}
                {/* div for stagename 
                    the div does not have an edit feature

                    div for bio with an editable text box.

                    div for location that has edit button, location can be any parameters, required either city, state, or zip, but only one  of those is required

                    div for conversations

                    div for selecting instruments they play and genres they play

                    optional: div for social media links

                */}
                
                <form >
                    <h1 className="sans-serif para">This is the dashboard placeholder page. You'll notice it's the same as the login right now</h1>
                    
                    <label htmlFor="email" className="sans-serif subpara">Email:</label>
                    <input name="email" type="email" className="sans-serif sm"/>
                    
                    <label htmlFor="password" className="sans-serif subpara">Password:</label>
                    <input name="password" type="password" className="sans-serif sm" />

                    <button type="submit" className="sans-serif sm">Submit</button>

                    
                </form>
            </section>
            :  <h4>
                    You need to be logged in to see this. Sign up or log in using the navigation above!
                </h4> }
        </>
    )
}

export default Dashboard;
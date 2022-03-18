import React, { useEffect, useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import { ADD_MUSIC } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";

import GenreList from "../components/GenreList"
import InstrumentList from "../components/InstrumentList"
import MediaList from "../components/MediaList";

import Auth from "../utils/auth";

const Dashboard = (props) => {
    const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
    

    const user = dataMe?.me._id;

    console.log(user);


    const { loading, data } = useQuery(QUERY_USER, {
        variables: {_id: user },
    });

    const userData = data;

    console.log(userData);
 
    const [myMedia, setMyMedia] = useState(null);
    const getMyMedia = (data) => {
        return data?.me.music;
    };
    const { loading: mediaLoading } = useQuery(QUERY_ME, {
        onCompleted: (data) => setMyMedia(getMyMedia(data))
    });

    let media = myMedia || [];

    if (loadingMe || loading) {
        return <div>Loading...</div>
    }

        return (
            <> 
            {user ? 
                <section className="user-dashboard main">
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
                        <h1 className="sans-serif para">Your Dashboard</h1>
                        
                        <div className="sans-serif para">
                            <GenreList genres={userData.user.music}/>
                            
                        </div>

                        <Link className="serif sm" to="/dashboard/myreviews">View your reviews</Link>
                        <Link className="serif sm" to="/media">Add to your Profile!</Link>

                    
                    </form>
                </section>
                :   <div>
                        <h4>You need to be logged in to see this. Sign up or log in using the navigation above!</h4>
                        <Link className="serif sm" to="/dashboard/myreviews">View your reviews</Link>
                    </div>
            }
            </>
        )
}

export default Dashboard;
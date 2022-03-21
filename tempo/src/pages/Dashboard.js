import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import { ADD_MUSIC } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";

import GenreList from "../components/GenreList"
import InstrumentList from "../components/InstrumentList"
import MediaList from "../components/MediaList";

const Dashboard = (props) => {
    // check that a user is logged in, then set user = logged in user's id
    const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
    const user = dataMe?.me._id;
    // console log the logged in user's id
    console.log(user);

    // query the logged in user's data, then set userData = their data
    const { loading, data } = useQuery(QUERY_USER, {
        variables: {_id: user },
    });
    const userData = data;
    // console log their data
    console.log(userData);
 
    const [myMedia, setMyMedia] = useState(null);
    const getMyMedia = (userToGetMediaOf) => {
        return userToGetMediaOf?.me.meta;
    };
    const { loading: mediaLoading } = useQuery(QUERY_ME, {
        onCompleted: (response) => setMyMedia(getMyMedia(response))
    });

    let media = myMedia || [];

    if (loadingMe || loading || mediaLoading) {
        return <div className="main serif para grey loading">Loading...</div>
    }

        return (
            <> 
            {userData ? 
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
                    <div className="main-gold">
                        <form >
                            <h1 className="sans-serif para">{userData.user.username}</h1>
                            
                            <div className="list-border">
                                <GenreList media={media}/>
                            </div>
                            <div className="list-border">
                                <InstrumentList media={media}/>
                            </div>
                        
                            <Link className="serif sm" to="/dashboard/myreviews">View your reviews</Link>
                            <Link className="serif sm" to="/media">Add to your Profile!</Link>
                        
                            <div>
                                <MediaList media={media}></MediaList>
                            </div>
                        </form>
                    </div>
                </section>
                :   <div className="main-background">
                      <h4>You need to be logged in to see this. Sign up or log in using the navigation above!</h4>
                    </div>
            }
            </>
        )
}

export default Dashboard;
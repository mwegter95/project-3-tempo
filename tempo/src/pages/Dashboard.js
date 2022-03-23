import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { EDIT_USER, EDIT_MUSIC, DELETE_MUSIC } from "../utils/mutations";
import { QUERY_ME, QUERY_USER, QUERY_USERMUSIC } from "../utils/queries";

import GenreList from "../components/GenreList"
import InstrumentList from "../components/InstrumentList"
import MediaList from "../components/MediaList";

const Dashboard = (props) => {
    // check that a user is logged in, then set user = logged in user's id
    const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
    const user = dataMe?.me._id;
    // console log the logged in user's id
    console.log("IS ME", dataMe);
    console.log(dataMe?.me.username);

    // query the logged in user's data, then set userData = their data
    const { loading, data } = useQuery(QUERY_USER, {
        variables: {_id: user },
    });
    const userData = data;
    // console log their data
    //console.log(userData);
 
    const [myMedia, setMyMedia] = useState(null);
    const getMyMedia = (musicRecord) => {
        console.log("music record ", musicRecord);
        return musicRecord?.userMusic;
    };
    const { loading: mediaLoading } = useQuery(QUERY_USERMUSIC, {
        variables: {_id: user },
        onCompleted: (response) => {
            //console.log("response ", response);
            setMyMedia(getMyMedia(response))
        }
    });

    const media = myMedia || [];
    //console.log(media);
    if (loadingMe || loading || mediaLoading) {
        return <section className="main-background">
            <div className="main-gold">
                <h1 className="serif-bold sm white loading">Loading...</h1>
            </div>
        </section>
    }
        console.log(media);
        //console.log(myMedia);
        return (
            <> 
            {userData ? 
                <section className="user-dashboard main-background">
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
                        <section>
                            <Fade>
                                <h1 className="sans-serif subtitle white">Your dashboard.</h1>
                            </Fade>

                            <Fade delay={300}>
                                <article className="dashboard-card card-top">
                                    <Fade delay={300}>
                                        <h1 className="sans-serif para white">General</h1>
                                    </Fade>
                                
                                    <Fade delay={500}>
                                        <div className="sans-serif subpara white">
                                            { dataMe?.me.type === "Musician" && <p>Stagename:</p> }
                                            { dataMe?.me.type === "Band" && <p>Band Name:</p> }
                                            <p>{dataMe?.me.username}</p>
                                        </div>
                                    </Fade>
                                
                                    <Fade delay={700}>
                                        <div className="sans-serif subpara white">
                                            <p>Status:</p>
                                            <p>{dataMe?.me.status}</p>
                                        </div>
                                    </Fade>
                                
                                    <Fade delay={900}>
                                        <div className="sans-serif subpara white">
                                            <p>Biography:</p>
                                            <p>{dataMe?.me.biography}</p>
                                        </div>
                                    </Fade>
                                </article>
                                
                                <article className="dashboard-card card-bottom">
                                    <Fade delay={300}> 
                                        <h1 className="sans-serif para">Music</h1>
                                    </Fade> 
                                    
                                    <Fade delay={500}>
                                        <div className="sans-serif subpara">
                                            <p>Instruments:</p>
                                            <InstrumentList media={media}/>
                                        </div>
                                    </Fade>
                                
                                    <Fade delay={700}>
                                        <div className="sans-serif subpara">
                                            <p>Genres:</p>
                                            <GenreList media={media}/>
                                        </div>
                                    </Fade>
                                
                                    <Fade delay={300}> 
                                        <h1 className="sans-serif subpara">Media:</h1>
                                    </Fade>

                                    <div className="sans-serif subpara">
                                        <MediaList media={media} setMyMedia={setMyMedia}></MediaList>
                                    </div>
                                
                                    <Fade delay={300}>
                                        <div className="dash-buttons">
                                            <Link className="sans-serif sm" to="/media">+ Add to your music</Link>
                                            <Link className="sans-serif sm" to="/dashboard/myreviews">View your reviews</Link>
                                        </div>
                                    </Fade>
                                </article>
                            </Fade>
                        </section>
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

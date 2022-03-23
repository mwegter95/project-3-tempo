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

    // query the logged in user's data, then set userData = their data
    const { loading, data } = useQuery(QUERY_USER, {
        variables: {_id: user },
    });
    const userData = data;
 
    const [myMedia, setMyMedia] = useState(null);
    const getMyMedia = (musicRecord) => {
        return musicRecord?.userMusic;
    };
    const { loading: mediaLoading } = useQuery(QUERY_USERMUSIC, {
        variables: {_id: user },
        onCompleted: (response) => {
            setMyMedia(getMyMedia(response))
        }
    });



    const media = myMedia || [];
    if (loadingMe || loading || mediaLoading) {
        return <section className="main-background">
            <div className="main-gold">
                <h1 className="serif-bold sm white loading">Loading...</h1>
            </div>
        </section>
    }
  
    return (
        <> 
        {userData ? 
            <section className="main-background">
                <div className="main-gold">
                    <section>
                        <Fade>
                            <h1 className="sans-serif subtitle white">Your dashboard.</h1>
                        </Fade>
                        <Fade delay={300}>
                            <article className="dashboard-card card-top">
                                <Fade delay={300}>
                                    <div className="avatar-right">
                                        <h1 className="sans-serif para white">General</h1>
                                        <div className="avatar">
                                            <img src={dataMe?.me.avatar} alt="user avatar"></img>
                                        </div>
                                    </div>
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
                                        <p  className="bio sm">{dataMe?.me.biography}</p>
                                    </div>
                                </Fade>
                            </article>

                            <article className="dashboard-card card-bottom">
                                <Fade delay={300}> 
                                    <h1 className="sans-serif para">Music</h1>
                                </Fade> 

                                <Fade delay={500}>
                                    <div className="sans-serif subpara media-spacing">
                                        <p>Instruments:</p>
                                        <InstrumentList media={media}/>
                                    </div>
                                </Fade>

                                <Fade delay={600}>
                                    <div className="sans-serif subpara media-spacing">
                                        <p>Genres:</p>
                                        <GenreList media={media}/>
                                    </div>
                                </Fade>
                            
                                <Fade delay={700}> 
                                    <h1 className="sans-serif subpara">Media:</h1>
                                </Fade>

                                <div className="sans-serif subpara">
                                    <MediaList media={media} />
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
